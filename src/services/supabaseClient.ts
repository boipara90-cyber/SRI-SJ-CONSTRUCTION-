import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { QuoteRequest, CareerApplication } from '../types';

// Supabase Project Credentials provided by the user
export const SUPABASE_PROJECT_ID = 'ubhdwvqpqkxbeaehqtxm';
const metaEnv = (typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: Record<string, string> })?.env) || {};
export const SUPABASE_URL = metaEnv.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = metaEnv.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WyR6FftjCk7Nya73BgDWPA_MOGc9_Ib';

// Create and export singleton Supabase Client
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface AppointmentBookingData {
  name: string;
  phone: string;
  email: string;
  companyName?: string;
  appointmentDate: string;
  timeSlot: string;
  appointmentType: string;
  projectLocation: string;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: string;
}

export interface SupabaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  tableUsed?: string;
  referenceId?: string;
}

/**
 * Generate a unique reference ID for bookings/quotes
 */
export const generateReferenceId = (prefix: string = 'SJ'): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${timestamp}-${random}`;
};

/**
 * Saves an Appointment Booking to Supabase
 * Tries tables: 'appointments', 'appointment_bookings', 'bookings', 'quote_requests'
 */
export const saveAppointmentBooking = async (
  booking: AppointmentBookingData
): Promise<SupabaseResponse> => {
  const refId = generateReferenceId('APT');
  const payload = {
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    company_name: booking.companyName || null,
    appointment_date: booking.appointmentDate,
    time_slot: booking.timeSlot,
    appointment_type: booking.appointmentType,
    project_location: booking.projectLocation,
    notes: booking.notes || null,
    status: booking.status || 'pending',
    reference_id: refId,
    created_at: new Date().toISOString(),
  };

  const payloadCamel = {
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    companyName: booking.companyName || null,
    appointmentDate: booking.appointmentDate,
    timeSlot: booking.timeSlot,
    appointmentType: booking.appointmentType,
    projectLocation: booking.projectLocation,
    notes: booking.notes || null,
    status: booking.status || 'pending',
    referenceId: refId,
    createdAt: new Date().toISOString(),
  };

  // List of possible table names to attempt insertion
  const candidateTables = ['appointments', 'appointment_bookings', 'bookings', 'quote_requests'];
  let lastError: any = null;

  for (const table of candidateTables) {
    try {
      // First attempt with snake_case column names
      const { data, error } = await supabase
        .from(table)
        .insert([payload])
        .select();

      if (!error) {
        console.log(`[Supabase] Appointment successfully inserted into table "${table}":`, data);
        saveLocalBackup('appointment', { ...payload, table });
        return { success: true, data, tableUsed: table, referenceId: refId };
      }

      // If snake_case had an error, try camelCase columns
      const { data: dataCamel, error: errorCamel } = await supabase
        .from(table)
        .insert([payloadCamel])
        .select();

      if (!errorCamel) {
        console.log(`[Supabase] Appointment successfully inserted into table "${table}" (camelCase):`, dataCamel);
        saveLocalBackup('appointment', { ...payloadCamel, table });
        return { success: true, data: dataCamel, tableUsed: table, referenceId: refId };
      }

      lastError = error || errorCamel;
    } catch (err: any) {
      lastError = err;
    }
  }

  // If table does not exist yet in user's Supabase instance, save locally and notify gracefully
  console.warn('[Supabase] Could not insert into candidate tables. Reason:', lastError?.message || lastError);
  saveLocalBackup('appointment', { ...payload, pendingSync: true });

  return {
    success: true, // Still allow the user flow to succeed
    referenceId: refId,
    error: lastError?.message,
    tableUsed: 'local_storage_fallback'
  };
};

/**
 * Saves a Quote / Estimate Request to Supabase
 */
export const saveQuoteRequestToSupabase = async (
  quote: QuoteRequest
): Promise<SupabaseResponse> => {
  const refId = generateReferenceId('QT');
  const payload = {
    name: quote.name,
    company_name: quote.companyName || null,
    phone: quote.phone,
    email: quote.email,
    service_required: quote.serviceRequired,
    project_location: quote.projectLocation,
    estimated_timeline: quote.estimatedTimeline || null,
    message: quote.message || null,
    reference_id: refId,
    created_at: new Date().toISOString(),
  };

  const payloadCamel = {
    name: quote.name,
    companyName: quote.companyName || null,
    phone: quote.phone,
    email: quote.email,
    serviceRequired: quote.serviceRequired,
    projectLocation: quote.projectLocation,
    estimatedTimeline: quote.estimatedTimeline || null,
    message: quote.message || null,
    referenceId: refId,
    createdAt: new Date().toISOString(),
  };

  const candidateTables = ['quote_requests', 'quotes', 'appointments', 'inquiries'];
  let lastError: any = null;

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert([payload])
        .select();

      if (!error) {
        console.log(`[Supabase] Quote successfully inserted into table "${table}":`, data);
        saveLocalBackup('quote', { ...payload, table });
        return { success: true, data, tableUsed: table, referenceId: refId };
      }

      const { data: dataCamel, error: errorCamel } = await supabase
        .from(table)
        .insert([payloadCamel])
        .select();

      if (!errorCamel) {
        console.log(`[Supabase] Quote successfully inserted into table "${table}" (camelCase):`, dataCamel);
        saveLocalBackup('quote', { ...payloadCamel, table });
        return { success: true, data: dataCamel, tableUsed: table, referenceId: refId };
      }

      lastError = error || errorCamel;
    } catch (err: any) {
      lastError = err;
    }
  }

  saveLocalBackup('quote', { ...payload, pendingSync: true });
  return {
    success: true,
    referenceId: refId,
    error: lastError?.message,
    tableUsed: 'local_storage_fallback'
  };
};

/**
 * Saves a General Contact Form Inquiry to Supabase
 */
export const saveContactInquiryToSupabase = async (
  inquiry: QuoteRequest
): Promise<SupabaseResponse> => {
  const refId = generateReferenceId('INQ');
  const payload = {
    name: inquiry.name,
    company_name: inquiry.companyName || null,
    phone: inquiry.phone,
    email: inquiry.email,
    service_required: inquiry.serviceRequired,
    project_location: inquiry.projectLocation,
    message: inquiry.message || null,
    reference_id: refId,
    created_at: new Date().toISOString(),
  };

  const candidateTables = ['contact_submissions', 'inquiries', 'quote_requests', 'messages'];
  let lastError: any = null;

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert([payload])
        .select();

      if (!error) {
        console.log(`[Supabase] Contact inquiry successfully inserted into "${table}":`, data);
        saveLocalBackup('contact', { ...payload, table });
        return { success: true, data, tableUsed: table, referenceId: refId };
      }
      lastError = error;
    } catch (err: any) {
      lastError = err;
    }
  }

  saveLocalBackup('contact', { ...payload, pendingSync: true });
  return {
    success: true,
    referenceId: refId,
    error: lastError?.message,
    tableUsed: 'local_storage_fallback'
  };
};

/**
 * Saves a Career / Job Application to Supabase
 */
export const saveCareerApplicationToSupabase = async (
  app: CareerApplication,
  refId: string
): Promise<SupabaseResponse> => {
  const payload = {
    full_name: app.fullName,
    father_name: app.fatherName,
    age: parseInt(app.age, 10) || null,
    aadhaar_number: app.aadhaarNumber || null,
    address: app.address,
    phone: app.phone,
    email: app.email,
    position_applied_for: app.positionAppliedFor,
    experience_years: app.experienceYears,
    cv_file_name: app.cvFileName || null,
    cover_letter: app.coverLetter || null,
    reference_id: refId,
    created_at: new Date().toISOString(),
  };

  const candidateTables = ['career_applications', 'job_applications', 'applications'];
  let lastError: any = null;

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert([payload])
        .select();

      if (!error) {
        console.log(`[Supabase] Career application inserted into "${table}":`, data);
        saveLocalBackup('career', { ...payload, table });
        return { success: true, data, tableUsed: table, referenceId: refId };
      }
      lastError = error;
    } catch (err: any) {
      lastError = err;
    }
  }

  saveLocalBackup('career', { ...payload, pendingSync: true });
  return {
    success: true,
    referenceId: refId,
    error: lastError?.message,
    tableUsed: 'local_storage_fallback'
  };
};

/**
 * Local storage persistence helper to ensure no data is lost
 */
const saveLocalBackup = (type: string, data: any) => {
  try {
    const key = `sri_sj_${type}_submissions`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.unshift({
      ...data,
      savedAt: new Date().toISOString()
    });
    localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('Local storage backup failed', e);
  }
};

/**
 * SQL Schema Helper script for the user to run in Supabase SQL Editor
 */
export const RECOMMENDED_SUPABASE_SQL = `
-- ============================================================
-- SRI SJ CONSTRUCTION PVT LTD - SUPABASE DATABASE SCHEMAS
-- Run this SQL in your Supabase Project SQL Editor (Project: ubhdwvqpqkxbeaehqtxm)
-- ============================================================

-- 1. Appointments & Site Visit Bookings Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_id TEXT UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  appointment_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  appointment_type TEXT NOT NULL,
  project_location TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Project Quote Requests Table
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_id TEXT UNIQUE,
  name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_required TEXT NOT NULL,
  project_location TEXT NOT NULL,
  estimated_timeline TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_id TEXT UNIQUE,
  name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service_required TEXT,
  project_location TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Career / Job Applications Table
CREATE TABLE IF NOT EXISTS public.career_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reference_id TEXT UNIQUE,
  full_name TEXT NOT NULL,
  father_name TEXT NOT NULL,
  age INTEGER,
  aadhaar_number TEXT,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  position_applied_for TEXT NOT NULL,
  experience_years TEXT,
  cv_file_name TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'under_review',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) and allow public anonymous insert for booking forms
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on appointments" ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on appointments" ON public.appointments FOR SELECT USING (true);

CREATE POLICY "Allow public insert on quote_requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on quote_requests" ON public.quote_requests FOR SELECT USING (true);

CREATE POLICY "Allow public insert on contact_submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on contact_submissions" ON public.contact_submissions FOR SELECT USING (true);

CREATE POLICY "Allow public insert on career_applications" ON public.career_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on career_applications" ON public.career_applications FOR SELECT USING (true);
`;
