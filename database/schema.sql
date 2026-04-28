create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text unique not null,
  role text not null check (role in ('citizen', 'driver', 'hospital', 'operator', 'admin')),
  blood_group text,
  allergies text,
  created_at timestamptz not null default now()
);

create table if not exists ambulances (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid references users(id) on delete set null,
  lat numeric(10, 7) not null default 0,
  lng numeric(10, 7) not null default 0,
  status text not null default 'Available',
  created_at timestamptz not null default now()
);

create table if not exists hospitals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  lat numeric(10, 7) not null default 0,
  lng numeric(10, 7) not null default 0,
  icu_beds integer not null default 0,
  emergency_beds integer not null default 0,
  specialties text[] not null default '{}',
  rating numeric(3, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists emergencies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  type text not null,
  severity text not null check (severity in ('Low', 'Medium', 'Critical')),
  description text,
  lat numeric(10, 7) not null default 0,
  lng numeric(10, 7) not null default 0,
  status text not null default 'Reported',
  assigned_ambulance_id uuid references ambulances(id) on delete set null,
  assigned_hospital_id uuid references hospitals(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists assignments (
  id uuid primary key default gen_random_uuid(),
  emergency_id uuid references emergencies(id) on delete cascade,
  ambulance_id uuid references ambulances(id) on delete set null,
  hospital_id uuid references hospitals(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists analytics_logs (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_emergencies_status on emergencies(status);
create index if not exists idx_emergencies_created_at on emergencies(created_at desc);
create index if not exists idx_ambulances_status on ambulances(status);
create index if not exists idx_hospitals_rating on hospitals(rating desc);
