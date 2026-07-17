-- DentalFlow AI Seed Data

-- 1. Insert Clinic
INSERT INTO public.clinics (id, name, address, phone, email)
VALUES ('7c9e6679-7425-40de-944b-e07fc1f90ae7', 'DentalFlow AI - Gurugram Clinic', 'Golf Course Road, Sector 54, Gurugram, India', '+91 9820022334', 'hello@dentalflow.ai')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Doctors
INSERT INTO public.doctors (id, clinic_id, name, specialization, image_url, email, phone, bio, rating, availability)
VALUES 
  ('11111111-1111-1111-1111-111111111111', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Sameer Sharma', 'Orthodontist', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600', 'sameer.sharma@dentalflow.ai', '+91 9820011111', 'Specialist in braces and aligners with 12+ years of experience.', 4.90, '{"Monday": ["09:00", "10:00", "11:00", "14:00", "15:00"], "Tuesday": ["09:00", "10:00", "11:00"], "Wednesday": ["14:00", "15:00", "16:00"], "Thursday": ["09:00", "10:00", "11:00"], "Friday": ["14:00", "15:00", "16:00"], "Saturday": ["09:00", "10:00", "11:00"]}'),
  ('22222222-2222-2222-2222-222222222222', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Sarah Patel', 'Pedodontist', 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600', 'sarah.patel@dentalflow.ai', '+91 9820022222', 'Dedicated to pediatric dental care and creating anxiety-free visits for children.', 4.95, '{"Monday": ["10:00", "11:00", "12:00"], "Tuesday": ["14:00", "15:00"], "Thursday": ["10:00", "11:00"], "Friday": ["14:00", "15:00"], "Saturday": ["10:00", "11:00"]}'),
  ('33333333-3333-3333-3333-333333333333', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Nitin Gupta', 'Oral & Implant Surgeon', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600', 'nitin.gupta@dentalflow.ai', '+91 9820033333', 'Expert in complex dental implant surgery, bone grafting, and wisdom tooth extractions.', 4.92, '{"Monday": ["14:00", "15:00", "16:00"], "Tuesday": ["09:00", "10:00", "11:00"], "Wednesday": ["09:00", "10:00", "11:00"], "Thursday": ["14:00", "15:00"], "Friday": ["09:00", "10:00", "11:00"], "Saturday": ["14:00", "15:00"]}'),
  ('44444444-4444-4444-4444-444444444444', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Tanvi Desai', 'Endodontist', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600', 'tanvi.desai@dentalflow.ai', '+91 9820044444', 'Specializes in painless root canal treatments using advanced micro-endodontics.', 4.88, '{"Monday": ["09:00", "10:00"], "Tuesday": ["15:00", "16:00"], "Wednesday": ["09:00", "10:00"], "Thursday": ["15:00", "16:00"], "Friday": ["09:00", "10:00"], "Saturday": ["15:00", "16:00"]}'),
  ('55555555-5555-5555-5555-555555555555', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Amit Shah', 'Prosthodontist', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600', 'amit.shah@dentalflow.ai', '+91 9820055555', 'Specialist in dental crowns, bridges, dentures, and full mouth rehabilitations.', 4.85, '{"Monday": ["11:00", "12:00"], "Tuesday": ["11:00", "12:00"], "Wednesday": ["11:00", "12:00"], "Thursday": ["11:00", "12:00"], "Friday": ["11:00", "12:00"], "Saturday": ["11:00", "12:00"]}'),
  ('66666666-6666-6666-6666-666666666666', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Meera Reddy', 'Periodontist', 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=600', 'meera.reddy@dentalflow.ai', '+91 9820066666', 'Specialist in gum disease treatments, gum grafting, and laser periodontics.', 4.87, '{"Monday": ["15:00", "16:00"], "Wednesday": ["15:00", "16:00"], "Friday": ["15:00", "16:00"]}'),
  ('77777777-7777-7777-7777-777777777777', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Kiran Verma', 'Cosmetic Dentist', 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600', 'kiran.verma@dentalflow.ai', '+91 9820077777', 'Expert in digital smile design, porcelain veneers, and laser teeth whitening.', 4.94, '{"Monday": ["09:00", "10:00", "11:00", "14:00", "15:00"], "Tuesday": ["09:00", "10:00"], "Thursday": ["14:00", "15:00"], "Friday": ["09:00", "10:00"], "Saturday": ["09:00", "10:00", "11:00"]}'),
  ('88888888-8888-8888-8888-888888888888', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Dr. Riya Kapoor', 'General Dentist', 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=600', 'riya.kapoor@dentalflow.ai', '+91 9820088888', 'Provides comprehensive family dentistry, preventive cleanings, and emergency care.', 4.90, '{"Monday": ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"], "Tuesday": ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"], "Wednesday": ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"], "Thursday": ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"], "Friday": ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"], "Saturday": ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"]}')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Patients
INSERT INTO public.patients (id, clinic_id, name, email, phone, medical_history)
VALUES 
  ('12345678-1234-1234-1234-123456789012', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Amit Kumar', 'amit.kumar@gmail.com', '+91 9876543210', 'No known allergies. Sensitive teeth.'),
  ('23456789-2345-2345-2345-234567890123', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Priya Sharma', 'priya.sharma@yahoo.com', '+91 9876543211', 'Asthmatic. History of orthodontic braces in 2021.'),
  ('34567890-3456-3456-3456-345678901234', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Rohan Mehta', 'rohan.mehta@outlook.com', '+91 9876543212', 'Hypertension. Takes aspirin.')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Staff
INSERT INTO public.staff (id, clinic_id, name, role, email, phone)
VALUES 
  ('99999999-9999-9999-9999-999999999991', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Neha Sen', 'Admin', 'admin@dentalflow.ai', '+91 9820099991'),
  ('99999999-9999-9999-9999-999999999992', '7c9e6679-7425-40de-944b-e07fc1f90ae7', 'Karan Johar', 'Receptionist', 'reception@dentalflow.ai', '+91 9820099992')
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Reviews
INSERT INTO public.reviews (id, clinic_id, patient_id, doctor_id, rating, comment, ai_response)
VALUES 
  ('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', '7c9e6679-7425-40de-944b-e07fc1f90ae7', '12345678-1234-1234-1234-123456789012', '33333333-3333-3333-3333-333333333333', 5, 'Dr. Nitin Gupta was amazing with my dental implant surgery! Absolutely pain-free and highly professional.', 'Thank you for sharing your experience, Amit! We are thrilled to hear that Dr. Nitin Gupta made your implant surgery comfortable and painless. We look forward to supporting your smile!'),
  ('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', '7c9e6679-7425-40de-944b-e07fc1f90ae7', '23456789-2345-2345-2345-234567890123', '11111111-1111-1111-1111-111111111111', 5, 'My Invisalign treatment with Dr. Sameer was super smooth. The AI tracker really helped. Highly recommend DentalFlow!', 'Thank you, Priya! Dr. Sameer and the team are glad you enjoyed the seamless Invisalign alignment and tracker. Keep smiling!'),
  ('c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', '7c9e6679-7425-40de-944b-e07fc1f90ae7', '34567890-3456-3456-3456-345678901234', '77777777-7777-7777-7777-777777777777', 5, 'Cleanest clinic I have ever visited. Laser teeth whitening was fast and result is fantastic!', 'Thank you for the review, Rohan! Dr. Kiran Verma and our staff work hard to maintain the cleanest environment and deliver stellar whitening results. See you soon!')
ON CONFLICT (id) DO NOTHING;
