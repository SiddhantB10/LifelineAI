import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const datasetsDir = path.join(rootDir, 'datasets');
const curatedDir = path.join(datasetsDir, 'curated');
const backendDataDir = path.join(rootDir, 'backend', 'src', 'data');

function splitCsvLine(line) {
  return line.split(',').map((part) => part.trim());
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? '';
    });
    return row;
  });
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function sortObjectMap(map, limit = 10) {
  return Object.entries(map)
    .map(([key, value]) => ({ key, value }))
    .sort((left, right) => right.value - left.value)
    .slice(0, limit);
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function summarizeAmbulanceDemand() {
  const filePath = path.join(datasetsDir, 'Ambulance Demand.csv');
  const rows = parseCsv(await readFile(filePath, 'utf8'));
  const demand = {};
  const emergencyType = {};
  const zone = {};
  const timeSlot = {};

  for (const row of rows) {
    demand[row.Demand_Level] = (demand[row.Demand_Level] ?? 0) + 1;
    emergencyType[row.Emergency_Type] = (emergencyType[row.Emergency_Type] ?? 0) + 1;
    zone[row.Zone] = (zone[row.Zone] ?? 0) + 1;
    timeSlot[row.Time_Slot] = (timeSlot[row.Time_Slot] ?? 0) + 1;
  }

  return {
    source: 'Ambulance Demand.csv',
    rows: rows.length,
    demandBreakdown: sortObjectMap(demand),
    emergencyTypeBreakdown: sortObjectMap(emergencyType),
    zoneBreakdown: sortObjectMap(zone),
    timeSlotBreakdown: sortObjectMap(timeSlot),
    useInApp: 'Ambulance staging, demand forecasting, and hotspot priority scoring',
  };
}

async function summarizeTrafficDataset() {
  const filePath = path.join(datasetsDir, 'traffic dataset.csv');
  const rows = parseCsv(await readFile(filePath, 'utf8'));
  const byTime = {};

  for (const row of rows) {
    const slot = row.time_of_day;
    if (!byTime[slot]) {
      byTime[slot] = { count: 0, vehicle_count: 0, average_speed: 0, lane_occupancy: 0, flow_rate: 0, waiting_time: 0 };
    }

    const bucket = byTime[slot];
    bucket.count += 1;
    bucket.vehicle_count += toNumber(row.vehicle_count);
    bucket.average_speed += toNumber(row.average_speed);
    bucket.lane_occupancy += toNumber(row.lane_occupancy);
    bucket.flow_rate += toNumber(row.flow_rate);
    bucket.waiting_time += toNumber(row.waiting_time);
  }

  const averagesByTime = Object.entries(byTime).map(([timeOfDay, bucket]) => ({
    timeOfDay,
    avgVehicleCount: bucket.vehicle_count / bucket.count,
    avgSpeed: bucket.average_speed / bucket.count,
    avgLaneOccupancy: bucket.lane_occupancy / bucket.count,
    avgFlowRate: bucket.flow_rate / bucket.count,
    avgWaitingTime: bucket.waiting_time / bucket.count,
  }));

  return {
    source: 'traffic dataset.csv',
    rows: rows.length,
    averagesByTime,
    useInApp: 'Route optimization and ETA adjustment',
  };
}

async function summarizeRoadAccidents() {
  const filePath = path.join(datasetsDir, 'road accidents data.csv');
  const rows = parseCsv(await readFile(filePath, 'utf8'));
  const stateTotals = {};
  const yearTotals = {};
  const timeBands = {
    '0-3 hrs. (Night)': 0,
    '3-6 hrs. (Night)': 0,
    '6-9 hrs (Day)': 0,
    '9-12 hrs (Day)': 0,
    '12-15 hrs (Day)': 0,
    '15-18 hrs (Day)': 0,
    '18-21 hrs (Night)': 0,
    '21-24 hrs (Night)': 0,
    Total: 0,
  };

  for (const row of rows) {
    stateTotals[row['STATE/UT']] = (stateTotals[row['STATE/UT']] ?? 0) + toNumber(row.Total);
    yearTotals[row.YEAR] = (yearTotals[row.YEAR] ?? 0) + toNumber(row.Total);
    Object.keys(timeBands).forEach((band) => {
      timeBands[band] += toNumber(row[band]);
    });
  }

  return {
    source: 'road accidents data.csv',
    rows: rows.length,
    topStatesByTotal: sortObjectMap(stateTotals, 15),
    totalsByYear: sortObjectMap(yearTotals, 20),
    timeBands,
    useInApp: 'Accident hotspot prediction and command-center heatmaps',
  };
}

async function summarizeRoutingDataset() {
  const filePath = path.join(datasetsDir, 'emergency service routing with timestamps.csv');
  const rows = parseCsv(await readFile(filePath, 'utf8'));
  const severity = {};
  const incidentType = {};
  const label = {};
  let responseTotal = 0;
  let hospitalCapacityTotal = 0;
  let distanceTotal = 0;

  for (const row of rows) {
    severity[row.Incident_Severity] = (severity[row.Incident_Severity] ?? 0) + 1;
    incidentType[row.Incident_Type] = (incidentType[row.Incident_Type] ?? 0) + 1;
    label[row.Label] = (label[row.Label] ?? 0) + 1;
    responseTotal += toNumber(row.Response_Time);
    hospitalCapacityTotal += toNumber(row.Hospital_Capacity);
    distanceTotal += toNumber(row.Distance_to_Incident);
  }

  const excludedColumns = [
    'Drone_Availability',
    'Battery_Life',
    'Air_Traffic',
    'Drone_Speed',
    'Payload_Weight',
    'Fuel_Level',
    'Weather_Impact',
    'Dispatch_Coordinator',
  ];

  return {
    source: 'emergency service routing with timestamps.csv',
    rows: rows.length,
    keepColumns: [
      'Timestamp',
      'Incident_Severity',
      'Incident_Type',
      'Region_Type',
      'Traffic_Congestion',
      'Weather_Condition',
      'Ambulance_Availability',
      'Response_Time',
      'Hospital_Capacity',
      'Distance_to_Incident',
      'Number_of_Injuries',
      'Specialist_Availability',
      'Road_Type',
      'Emergency_Level',
      'Label',
    ],
    excludedColumns,
    severityBreakdown: sortObjectMap(severity),
    incidentTypeBreakdown: sortObjectMap(incidentType),
    labelBreakdown: sortObjectMap(label),
    averages: {
      responseTime: responseTotal / rows.length,
      hospitalCapacity: hospitalCapacityTotal / rows.length,
      distanceToIncident: distanceTotal / rows.length,
    },
    useInApp: 'AI severity estimation, dispatch routing, and response-time benchmarking',
  };
}

async function summarizeVehicleDataset() {
  const folder = path.join(datasetsDir, 'vehicle detection dataset');
  const entries = await readdir(folder, { withFileTypes: true });
  const imageCounts = {};
  const annotationCounts = {};

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (entry.name.endsWith('.jpg') || entry.name.endsWith('.jpeg') || entry.name.endsWith('.png')) {
      const key = entry.name.replace(/^[0-9]+/, '').replace(/\.[^.]+$/, '');
      imageCounts[key] = (imageCounts[key] ?? 0) + 1;
    }
    if (entry.name.endsWith('.txt') && entry.name !== 'classes.names' && entry.name !== 'classes.txt' && entry.name !== 'labelled_data.data') {
      const key = entry.name.replace(/^[0-9]+/, '').replace(/\.[^.]+$/, '');
      annotationCounts[key] = (annotationCounts[key] ?? 0) + 1;
    }
  }

  return {
    source: 'vehicle detection dataset',
    classes: ['Ambulance', 'Bus', 'Car', 'Truck'],
    imageCounts,
    annotationCounts,
    useInApp: 'Vehicle-type detection for incident classification and ambulance filtering',
  };
}

async function main() {
  await ensureDir(curatedDir);
  await ensureDir(backendDataDir);

  const datasets = {
    ambulanceDemand: await summarizeAmbulanceDemand(),
    traffic: await summarizeTrafficDataset(),
    roadAccidents: await summarizeRoadAccidents(),
    routing: await summarizeRoutingDataset(),
    vehicleDetection: await summarizeVehicleDataset(),
  };

  await writeFile(path.join(curatedDir, 'manifest.json'), JSON.stringify(datasets, null, 2));
  await writeFile(
    path.join(backendDataDir, 'datasetInsights.js'),
    `export const datasetInsights = ${JSON.stringify(datasets, null, 2)};\n`,
  );

  const curatedReadme = [
    '# Curated Datasets',
    '',
    'The app consumes the cleaned summaries below instead of loading the raw files directly.',
    '',
    '## Kept for runtime',
    '',
    '- `Ambulance Demand.csv` for demand forecasting and dispatch staging',
    '- `traffic dataset.csv` for route optimization and ETA correction',
    '- `road accidents data.csv` for hotspot prediction and city heatmaps',
    '- `emergency service routing with timestamps.csv` for routing intelligence and response benchmarking',
    '- `vehicle detection dataset/` for ambulance/car/truck/bus type recognition',
    '',
    '## Removed from runtime',
    '',
    '- Drone-only fields from the routing dataset',
    '- Raw row index columns in the traffic dataset',
    '- Direct loading of raw image annotations in the web app',
    '',
    '## Runtime source',
    '',
    '- `backend/src/data/datasetInsights.js` is the compact runtime module generated from the raw sources.',
    '',
  ].join('\n');

  await writeFile(path.join(curatedDir, 'README.md'), curatedReadme);
  console.log('Dataset curation complete.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
