-- CLInical AI Hospital Support - Database Schema
-- All tables in a single init.sql file

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



CREATE TYPE account_type AS ENUM ('patient', 'doctor', 'nurse');
CREATE TYPE suggestion_priority AS ENUM ('high', 'medium', 'low');
CREATE TYPE section_status AS ENUM ('pending', 'accepted');



CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    account_type account_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_accounts_email ON accounts(email);
CREATE INDEX idx_accounts_type ON accounts(account_type);



CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    source VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_new BOOLEAN DEFAULT TRUE,
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL
);

CREATE INDEX idx_notes_timestamp ON notes(timestamp DESC);
CREATE INDEX idx_notes_account ON notes(account_id);


CREATE TABLE suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority suggestion_priority NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_new BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_suggestions_priority ON suggestions(priority);
CREATE INDEX idx_suggestions_timestamp ON suggestions(timestamp DESC);



CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL UNIQUE
);

CREATE INDEX idx_doctors_name ON doctors(name);



CREATE TABLE doctor_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    working_days INTEGER[] NOT NULL DEFAULT '{1,2,3,4,5}',
    work_hours VARCHAR(255)[] NOT NULL DEFAULT ARRAY['9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm']
);

CREATE INDEX idx_doctor_schedules_doctor ON doctor_schedules(doctor_id);



CREATE TABLE booked_appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    time VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(doctor_id, date, time)
);

CREATE INDEX idx_booked_appointments_doctor ON booked_appointments(doctor_id);
CREATE INDEX idx_booked_appointments_patient ON booked_appointments(patient_id);
CREATE INDEX idx_booked_appointments_date ON booked_appointments(date);



CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    patient_name VARCHAR(255) NOT NULL,
    patient_surname VARCHAR(255) NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_patient ON reports(patient_id);
CREATE INDEX idx_reports_doctor ON reports(doctor_id);
CREATE INDEX idx_reports_date ON reports(date DESC);



CREATE TABLE report_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    status section_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_report_sections_report ON report_sections(report_id);
CREATE INDEX idx_report_sections_status ON report_sections(status);



CREATE VIEW report_meta AS
SELECT 
    r.id,
    r.patient_id,
    r.patient_name,
    r.doctor_name,
    r.date,
    r.title
FROM reports r;



CREATE OR REPLACE FUNCTION get_available_time_slots(
    p_doctor_id UUID,
    p_date DATE
) RETURNS TABLE(time_slot VARCHAR(50)) AS $$
BEGIN
    RETURN QUERY
    SELECT unnest(ds.work_hours)::VARCHAR(50)
    FROM doctor_schedules ds
    WHERE ds.doctor_id = p_doctor_id
      AND EXTRACT(DOW FROM p_date)::INTEGER = ANY(ds.working_days)
    EXCEPT
    SELECT ba.time::VARCHAR(50)
    FROM booked_appointments ba
    WHERE ba.doctor_id = p_doctor_id
      AND ba.date = p_date;
END;
$$ LANGUAGE plpgsql;



-- Sample doctors (uncomment to add seed data)
-- INSERT INTO doctors (id, name) VALUES 
--     ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::UUID, 'Dr. Sarah Johnson'),
--     ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'::UUID, 'Dr. Michael Chen');

-- Sample doctor schedules
-- INSERT INTO doctor_schedules (doctor_id, working_days, work_hours)
-- SELECT d.id, ARRAY[1,2,3,4,5], ARRAY['9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm']
-- FROM doctors d;
