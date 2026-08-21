-- DentalFlow AI - Database Schema (PostgreSQL for Supabase)

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Clinics table (for multi-tenant support if adapted in future)
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Doctors table
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  email VARCHAR(255),
  phone VARCHAR(50),
  bio TEXT,
  rating DECIMAL(3, 2) DEFAULT 5.0,
  availability JSONB, -- stores daily availability slots e.g. {"Monday": ["09:00", "10:00", ...]}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Patients table
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  medical_history TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  treatment_name VARCHAR(255) NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, Completed, Cancelled, No-show
  notes TEXT,
  price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Staff table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL, -- Admin, Receptionist, Assistant, Accountant, Marketing
  email VARCHAR(255),
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Leads table (CRM)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100) DEFAULT 'Website', -- Website, Google, WhatsApp, Referral, Instagram, Facebook
  status VARCHAR(50) DEFAULT 'New Lead', -- New Lead, Consultation, Appointment, Treatment, Completed, Recall
  ai_score INTEGER, -- 1-10 priority scoring
  ai_notes TEXT, -- lead qualification details
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  ai_response TEXT, -- Automatically generated response by Gemini
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) & ACCESS CONTROL POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 1. Clinics Policies (Public read, authenticated write)
CREATE POLICY "Public clinics are viewable by everyone" ON clinics FOR SELECT USING (true);
CREATE POLICY "Staff can manage clinics" ON clinics FOR ALL TO authenticated USING (true);

-- 2. Doctors Policies (Public read, authenticated write)
CREATE POLICY "Doctors directory viewable by everyone" ON doctors FOR SELECT USING (true);
CREATE POLICY "Staff can manage doctors" ON doctors FOR ALL TO authenticated USING (true);

-- 3. Patients Policies (Restricted to authenticated staff/service role)
CREATE POLICY "Authenticated staff can manage patients" ON patients FOR ALL TO authenticated USING (true);

-- 4. Appointments Policies (Public insert for booking, authenticated management)
CREATE POLICY "Public patient booking insert" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated staff can view and update appointments" ON appointments FOR ALL TO authenticated USING (true);

-- 5. Staff Policies (Restricted to authenticated users)
CREATE POLICY "Staff directory viewable by authenticated users" ON staff FOR ALL TO authenticated USING (true);

-- 6. Leads Policies (Public lead capture insert, authenticated CRM management)
CREATE POLICY "Public lead form submission" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated staff can view and manage leads" ON leads FOR ALL TO authenticated USING (true);

-- 7. Reviews Policies (Public read, public submission, authenticated management)
CREATE POLICY "Reviews viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public review submission" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can manage reviews" ON reviews FOR ALL TO authenticated USING (true);

