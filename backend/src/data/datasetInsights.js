export const datasetInsights = {
  "ambulanceDemand": {
    "source": "Ambulance Demand.csv",
    "rows": 50000,
    "demandBreakdown": [
      {
        "key": "Medium",
        "value": 29132
      },
      {
        "key": "Low",
        "value": 16707
      },
      {
        "key": "High",
        "value": 4161
      }
    ],
    "emergencyTypeBreakdown": [
      {
        "key": "EMS",
        "value": 24601
      },
      {
        "key": "Traffic",
        "value": 18047
      },
      {
        "key": "Fire",
        "value": 7352
      }
    ],
    "zoneBreakdown": [
      {
        "key": "Urban",
        "value": 16774
      },
      {
        "key": "Rural",
        "value": 16707
      },
      {
        "key": "Highway",
        "value": 16519
      }
    ],
    "timeSlotBreakdown": [
      {
        "key": "Afternoon",
        "value": 18827
      },
      {
        "key": "Morning",
        "value": 13880
      },
      {
        "key": "Evening",
        "value": 12383
      },
      {
        "key": "Night",
        "value": 4910
      }
    ],
    "useInApp": "Ambulance staging, demand forecasting, and hotspot priority scoring"
  },
  "traffic": {
    "source": "traffic dataset.csv",
    "rows": 10000,
    "averagesByTime": [
      {
        "timeOfDay": "evening",
        "avgVehicleCount": 79.30229793977813,
        "avgSpeed": 49.512178383807715,
        "avgLaneOccupancy": 50.30933687739265,
        "avgFlowRate": 1001.5320919175912,
        "avgWaitingTime": 29.650051982629993
      },
      {
        "timeOfDay": "afternoon",
        "avgVehicleCount": 80.12099066179456,
        "avgSpeed": 49.950155988601345,
        "avgLaneOccupancy": 49.62210388549563,
        "avgFlowRate": 989.9460008120178,
        "avgWaitingTime": 29.047620048154506
      },
      {
        "timeOfDay": "night",
        "avgVehicleCount": 79.45573122529645,
        "avgSpeed": 49.76039055320321,
        "avgLaneOccupancy": 50.480162245919225,
        "avgFlowRate": 994.5130434782609,
        "avgWaitingTime": 28.947536439471925
      },
      {
        "timeOfDay": "morning",
        "avgVehicleCount": 80.20177204993959,
        "avgSpeed": 50.197481801610955,
        "avgLaneOccupancy": 50.449900942584115,
        "avgFlowRate": 992.0245670559807,
        "avgWaitingTime": 30.21111518607669
      }
    ],
    "useInApp": "Route optimization and ETA adjustment"
  },
  "roadAccidents": {
    "source": "road accidents data.csv",
    "rows": 490,
    "topStatesByTotal": [
      {
        "key": "Tamil Nadu",
        "value": 852073
      },
      {
        "key": "Maharashtra",
        "value": 641614
      },
      {
        "key": "Karnataka",
        "value": 584761
      },
      {
        "key": "Andhra Pradesh",
        "value": 546821
      },
      {
        "key": "Kerala",
        "value": 518161
      },
      {
        "key": "Madhya Pradesh",
        "value": 394007
      },
      {
        "key": "Rajasthan",
        "value": 323653
      },
      {
        "key": "Gujarat",
        "value": 300325
      },
      {
        "key": "Uttar Pradesh",
        "value": 274528
      },
      {
        "key": "West Bengal",
        "value": 189375
      },
      {
        "key": "Haryana",
        "value": 131921
      },
      {
        "key": "Delhi (Ut)",
        "value": 119274
      },
      {
        "key": "Chhattisgarh",
        "value": 117817
      },
      {
        "key": "Odisha",
        "value": 115237
      },
      {
        "key": "Bihar",
        "value": 92648
      }
    ],
    "totalsByYear": [
      {
        "key": "2014",
        "value": 450898
      },
      {
        "key": "2013",
        "value": 443001
      },
      {
        "key": "2011",
        "value": 440123
      },
      {
        "key": "2012",
        "value": 440042
      },
      {
        "key": "2010",
        "value": 430654
      },
      {
        "key": "2009",
        "value": 421628
      },
      {
        "key": "2007",
        "value": 418657
      },
      {
        "key": "2008",
        "value": 415855
      },
      {
        "key": "2006",
        "value": 394432
      },
      {
        "key": "2005",
        "value": 390378
      },
      {
        "key": "2004",
        "value": 361343
      },
      {
        "key": "2003",
        "value": 336468
      },
      {
        "key": "2002",
        "value": 335707
      },
      {
        "key": "2001",
        "value": 323720
      }
    ],
    "timeBands": {
      "0-3 hrs. (Night)": 390197,
      "3-6 hrs. (Night)": 474926,
      "6-9 hrs (Day)": 671864,
      "9-12 hrs (Day)": 859444,
      "12-15 hrs (Day)": 824089,
      "15-18 hrs (Day)": 906639,
      "18-21 hrs (Night)": 873630,
      "21-24 hrs (Night)": 602117,
      "Total": 5602906
    },
    "useInApp": "Accident hotspot prediction and command-center heatmaps"
  },
  "routing": {
    "source": "emergency service routing with timestamps.csv",
    "rows": 368065,
    "keepColumns": [
      "Timestamp",
      "Incident_Severity",
      "Incident_Type",
      "Region_Type",
      "Traffic_Congestion",
      "Weather_Condition",
      "Ambulance_Availability",
      "Response_Time",
      "Hospital_Capacity",
      "Distance_to_Incident",
      "Number_of_Injuries",
      "Specialist_Availability",
      "Road_Type",
      "Emergency_Level",
      "Label"
    ],
    "excludedColumns": [
      "Drone_Availability",
      "Battery_Life",
      "Air_Traffic",
      "Drone_Speed",
      "Payload_Weight",
      "Fuel_Level",
      "Weather_Impact",
      "Dispatch_Coordinator"
    ],
    "severityBreakdown": [
      {
        "key": "Low",
        "value": 220869
      },
      {
        "key": "Medium",
        "value": 110496
      },
      {
        "key": "High",
        "value": 36700
      }
    ],
    "incidentTypeBreakdown": [
      {
        "key": "Accident",
        "value": 184114
      },
      {
        "key": "Cardiac Arrest",
        "value": 73890
      },
      {
        "key": "Other",
        "value": 73545
      },
      {
        "key": "Fire",
        "value": 36516
      }
    ],
    "labelBreakdown": [
      {
        "key": "Drone Only",
        "value": 183690
      },
      {
        "key": "Ambulance Only",
        "value": 147526
      },
      {
        "key": "Hybrid Dispatch",
        "value": 36849
      }
    ],
    "averages": {
      "responseTime": 15.057149184210664,
      "hospitalCapacity": 54.49680898754296,
      "distanceToIncident": 25.460655047341504
    },
    "useInApp": "AI severity estimation, dispatch routing, and response-time benchmarking"
  },
  "vehicleDetection": {
    "source": "vehicle detection dataset",
    "classes": [
      "Ambulance",
      "Bus",
      "Car",
      "Truck"
    ],
    "imageCounts": {
      "Ambulance": 120,
      "car": 145,
      "Truck": 125,
      "BUS_0": 1,
      "BUS_1": 1,
      "BUS_10": 1,
      "BUS_100": 1,
      "BUS_101": 1,
      "BUS_102": 1,
      "BUS_103": 1,
      "BUS_104": 1,
      "BUS_105": 1,
      "BUS_106": 1,
      "BUS_107": 1,
      "BUS_108": 1,
      "BUS_109": 1,
      "BUS_11": 1,
      "BUS_110": 1,
      "BUS_111": 1,
      "BUS_112": 1,
      "BUS_113": 1,
      "BUS_114": 1,
      "BUS_115": 1,
      "BUS_116": 1,
      "BUS_117": 1,
      "BUS_118": 1,
      "BUS_119": 1,
      "BUS_12": 1,
      "BUS_120": 1,
      "BUS_121": 1,
      "BUS_122": 1,
      "BUS_123": 1,
      "BUS_124": 1,
      "BUS_125": 1,
      "BUS_126": 1,
      "BUS_127": 1,
      "BUS_128": 1,
      "BUS_129": 1,
      "BUS_13": 1,
      "BUS_130": 1,
      "BUS_131": 1,
      "BUS_132": 1,
      "BUS_133": 1,
      "BUS_134": 1,
      "BUS_135": 1,
      "BUS_136": 1,
      "BUS_137": 1,
      "BUS_138": 1,
      "BUS_139": 1,
      "BUS_14": 1,
      "BUS_140": 1,
      "BUS_141": 1,
      "BUS_142": 1,
      "BUS_143": 1,
      "BUS_144": 1,
      "BUS_145": 1,
      "BUS_146": 1,
      "BUS_147": 1,
      "BUS_148": 1,
      "BUS_149": 1,
      "BUS_15": 1,
      "BUS_150": 1,
      "BUS_151": 1,
      "BUS_152": 1,
      "BUS_153": 1,
      "BUS_154": 1,
      "BUS_155": 1,
      "BUS_156": 1,
      "BUS_157": 1,
      "BUS_158": 1,
      "BUS_159": 1,
      "BUS_16": 1,
      "BUS_160": 1,
      "BUS_161": 1,
      "BUS_162": 1,
      "BUS_163": 1,
      "BUS_164": 1,
      "BUS_165": 1,
      "BUS_17": 1,
      "BUS_18": 1,
      "BUS_19": 1,
      "BUS_2": 1,
      "BUS_20": 1,
      "BUS_21": 1,
      "BUS_22": 1,
      "BUS_23": 1,
      "BUS_24": 1,
      "BUS_25": 1,
      "BUS_26": 1,
      "BUS_27": 1,
      "BUS_28": 1,
      "BUS_29": 1,
      "BUS_3": 1,
      "BUS_30": 1,
      "BUS_31": 1,
      "BUS_32": 1,
      "BUS_33": 1,
      "BUS_34": 1,
      "BUS_35": 1,
      "BUS_36": 1,
      "BUS_37": 1,
      "BUS_38": 1,
      "BUS_39": 1,
      "BUS_4": 1,
      "BUS_40": 1,
      "BUS_41": 1,
      "BUS_42": 1,
      "BUS_43": 1,
      "BUS_44": 1,
      "BUS_45": 1,
      "BUS_46": 1,
      "BUS_47": 1,
      "BUS_48": 1,
      "BUS_49": 1,
      "BUS_5": 1,
      "BUS_50": 1,
      "BUS_51": 1,
      "BUS_52": 1,
      "BUS_53": 1,
      "BUS_54": 1,
      "BUS_55": 1,
      "BUS_56": 1,
      "BUS_57": 1,
      "BUS_58": 1,
      "BUS_59": 1,
      "BUS_6": 1,
      "BUS_60": 1,
      "BUS_61": 1,
      "BUS_62": 1,
      "BUS_63": 1,
      "BUS_64": 1,
      "BUS_65": 1,
      "BUS_66": 1,
      "BUS_67": 1,
      "BUS_68": 1,
      "BUS_69": 1,
      "BUS_7": 1,
      "BUS_70": 1,
      "BUS_71": 1,
      "BUS_72": 1,
      "BUS_73": 1,
      "BUS_74": 1,
      "BUS_75": 1,
      "BUS_76": 1,
      "BUS_77": 1,
      "BUS_78": 1,
      "BUS_79": 1,
      "BUS_8": 1,
      "BUS_80": 1,
      "BUS_81": 1,
      "BUS_82": 1,
      "BUS_83": 1,
      "BUS_84": 1,
      "BUS_85": 1,
      "BUS_86": 1,
      "BUS_87": 1,
      "BUS_88": 1,
      "BUS_89": 1,
      "BUS_9": 1,
      "BUS_90": 1,
      "BUS_91": 1,
      "BUS_92": 1,
      "BUS_93": 1,
      "BUS_94": 1,
      "BUS_95": 1,
      "BUS_96": 1,
      "BUS_97": 1,
      "BUS_98": 1,
      "BUS_99": 1
    },
    "annotationCounts": {
      "Ambulance": 120,
      "car": 145,
      "Truck": 125,
      "BUS_0": 1,
      "BUS_1": 1,
      "BUS_10": 1,
      "BUS_100": 1,
      "BUS_101": 1,
      "BUS_102": 1,
      "BUS_103": 1,
      "BUS_104": 1,
      "BUS_105": 1,
      "BUS_106": 1,
      "BUS_107": 1,
      "BUS_108": 1,
      "BUS_109": 1,
      "BUS_11": 1,
      "BUS_110": 1,
      "BUS_111": 1,
      "BUS_112": 1,
      "BUS_113": 1,
      "BUS_114": 1,
      "BUS_115": 1,
      "BUS_116": 1,
      "BUS_117": 1,
      "BUS_118": 1,
      "BUS_119": 1,
      "BUS_12": 1,
      "BUS_120": 1,
      "BUS_121": 1,
      "BUS_122": 1,
      "BUS_123": 1,
      "BUS_124": 1,
      "BUS_125": 1,
      "BUS_126": 1,
      "BUS_127": 1,
      "BUS_128": 1,
      "BUS_129": 1,
      "BUS_13": 1,
      "BUS_130": 1,
      "BUS_131": 1,
      "BUS_132": 1,
      "BUS_133": 1,
      "BUS_134": 1,
      "BUS_135": 1,
      "BUS_136": 1,
      "BUS_137": 1,
      "BUS_138": 1,
      "BUS_139": 1,
      "BUS_14": 1,
      "BUS_140": 1,
      "BUS_141": 1,
      "BUS_142": 1,
      "BUS_143": 1,
      "BUS_144": 1,
      "BUS_145": 1,
      "BUS_146": 1,
      "BUS_147": 1,
      "BUS_148": 1,
      "BUS_149": 1,
      "BUS_15": 1,
      "BUS_150": 1,
      "BUS_151": 1,
      "BUS_152": 1,
      "BUS_153": 1,
      "BUS_154": 1,
      "BUS_155": 1,
      "BUS_156": 1,
      "BUS_157": 1,
      "BUS_158": 1,
      "BUS_159": 1,
      "BUS_16": 1,
      "BUS_160": 1,
      "BUS_161": 1,
      "BUS_162": 1,
      "BUS_163": 1,
      "BUS_164": 1,
      "BUS_165": 1,
      "BUS_17": 1,
      "BUS_18": 1,
      "BUS_19": 1,
      "BUS_2": 1,
      "BUS_20": 1,
      "BUS_21": 1,
      "BUS_22": 1,
      "BUS_23": 1,
      "BUS_24": 1,
      "BUS_25": 1,
      "BUS_26": 1,
      "BUS_27": 1,
      "BUS_28": 1,
      "BUS_29": 1,
      "BUS_3": 1,
      "BUS_30": 1,
      "BUS_31": 1,
      "BUS_32": 1,
      "BUS_33": 1,
      "BUS_34": 1,
      "BUS_35": 1,
      "BUS_36": 1,
      "BUS_37": 1,
      "BUS_38": 1,
      "BUS_39": 1,
      "BUS_4": 1,
      "BUS_40": 1,
      "BUS_41": 1,
      "BUS_42": 1,
      "BUS_43": 1,
      "BUS_44": 1,
      "BUS_45": 1,
      "BUS_46": 1,
      "BUS_47": 1,
      "BUS_48": 1,
      "BUS_49": 1,
      "BUS_5": 1,
      "BUS_50": 1,
      "BUS_51": 1,
      "BUS_52": 1,
      "BUS_53": 1,
      "BUS_54": 1,
      "BUS_55": 1,
      "BUS_56": 1,
      "BUS_57": 1,
      "BUS_58": 1,
      "BUS_59": 1,
      "BUS_6": 1,
      "BUS_60": 1,
      "BUS_61": 1,
      "BUS_62": 1,
      "BUS_63": 1,
      "BUS_64": 1,
      "BUS_65": 1,
      "BUS_66": 1,
      "BUS_67": 1,
      "BUS_68": 1,
      "BUS_69": 1,
      "BUS_7": 1,
      "BUS_70": 1,
      "BUS_71": 1,
      "BUS_72": 1,
      "BUS_73": 1,
      "BUS_74": 1,
      "BUS_75": 1,
      "BUS_76": 1,
      "BUS_77": 1,
      "BUS_78": 1,
      "BUS_79": 1,
      "BUS_8": 1,
      "BUS_80": 1,
      "BUS_81": 1,
      "BUS_82": 1,
      "BUS_83": 1,
      "BUS_84": 1,
      "BUS_85": 1,
      "BUS_86": 1,
      "BUS_87": 1,
      "BUS_88": 1,
      "BUS_89": 1,
      "BUS_9": 1,
      "BUS_90": 1,
      "BUS_91": 1,
      "BUS_92": 1,
      "BUS_93": 1,
      "BUS_94": 1,
      "BUS_95": 1,
      "BUS_96": 1,
      "BUS_97": 1,
      "BUS_98": 1,
      "BUS_99": 1,
      "test": 1,
      "train": 1
    },
    "useInApp": "Vehicle-type detection for incident classification and ambulance filtering"
  }
};
