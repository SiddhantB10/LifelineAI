-- Demo data has been removed for production deployment
-- To seed the database with real data, create INSERT statements following this structure:

-- Example for users table:
-- insert into users (id, name, phone, email, role, blood_group, allergies)
-- values
--   ('unique-uuid', 'Real Name', '+91 9XXXXXXXXXX', 'email@domain.com', 'citizen', 'O+', 'None')
-- on conflict (email) do nothing;

-- Example for hospitals table:
-- insert into hospitals (id, name, lat, lng, icu_beds, emergency_beds, specialties, rating)
-- values
--   ('unique-uuid', 'Hospital Name', 28.1234, 77.5678, 10, 20, array['Cardiology', 'Emergency'], 4.8)
-- on conflict do nothing;

-- Example for ambulances table:
-- insert into ambulances (id, driver_id, lat, lng, status)
-- values
--   ('unique-uuid', 'driver-uuid', 28.1234, 77.5678, 'Available')
-- on conflict do nothing;

insert into emergencies (id, user_id, type, severity, description, lat, lng, status, assigned_ambulance_id, assigned_hospital_id)
values
  ('99999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111111', 'Heart Attack', 'Critical', 'Chest pain, sweating, shortness of breath', 28.6119, 77.2067, 'En Route', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444')
on conflict do nothing;
