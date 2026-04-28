insert into users (id, name, phone, email, role, blood_group, allergies)
values
  ('11111111-1111-1111-1111-111111111111', 'Aarav Sharma', '+91 98765 43210', 'aarav@example.com', 'citizen', 'O+', 'Penicillin'),
  ('22222222-2222-2222-2222-222222222222', 'Nikhil Verma', '+91 98880 11223', 'nikhil@example.com', 'driver', null, null),
  ('33333333-3333-3333-3333-333333333333', 'City Care Hospital', '+91 99999 00001', 'ops@citycare.test', 'hospital', null, null)
on conflict (email) do nothing;

insert into hospitals (id, name, lat, lng, icu_beds, emergency_beds, specialties, rating)
values
  ('44444444-4444-4444-4444-444444444444', 'City Care Hospital', 28.6139, 77.2090, 8, 14, array['Cardiology', 'Trauma', 'Neurology'], 4.90),
  ('55555555-5555-5555-5555-555555555555', 'Metro Life Medical', 28.6239, 77.2190, 4, 9, array['Pregnancy', 'Orthopedics', 'Emergency Surgery'], 4.70),
  ('66666666-6666-6666-6666-666666666666', 'North Star Trauma Center', 28.6039, 77.1990, 6, 11, array['Trauma', 'Critical Care', 'Fire Injuries'], 4.80)
on conflict do nothing;

insert into ambulances (id, driver_id, lat, lng, status)
values
  ('77777777-7777-7777-7777-777777777777', '22222222-2222-2222-2222-222222222222', 28.6122, 77.2122, 'Busy'),
  ('88888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 28.6189, 77.2052, 'Available')
on conflict do nothing;

insert into emergencies (id, user_id, type, severity, description, lat, lng, status, assigned_ambulance_id, assigned_hospital_id)
values
  ('99999999-9999-9999-9999-999999999999', '11111111-1111-1111-1111-111111111111', 'Heart Attack', 'Critical', 'Chest pain, sweating, shortness of breath', 28.6119, 77.2067, 'En Route', '77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444')
on conflict do nothing;
