import { supabase } from './supabaseClient';

export interface AdminBookingRecord {
  id: string;
  referenceId: string;
  name: string;
  phone: string;
  email: string;
  companyName?: string;
  appointmentDate: string;
  timeSlot: string;
  appointmentType: string;
  projectLocation: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  source: 'supabase' | 'local_backup';
}

export interface AdminQuoteRecord {
  id: string;
  referenceId: string;
  name: string;
  companyName?: string;
  phone: string;
  email: string;
  serviceRequired: string;
  projectLocation: string;
  estimatedTimeline?: string;
  message?: string;
  status?: string;
  createdAt: string;
}

export interface AdminContactRecord {
  id: string;
  referenceId: string;
  name: string;
  companyName?: string;
  phone: string;
  email: string;
  serviceRequired?: string;
  projectLocation?: string;
  message: string;
  createdAt: string;
}

export interface AdminCareerRecord {
  id: string;
  referenceId: string;
  fullName: string;
  fatherName?: string;
  phone: string;
  email: string;
  positionAppliedFor: string;
  experienceYears?: string;
  cvFileName?: string;
  address?: string;
  coverLetter?: string;
  createdAt: string;
}

// Fetch all bookings (Appointments) with automatic fallback to local storage
export const fetchAllBookings = async (): Promise<AdminBookingRecord[]> => {
  const candidateTables = ['appointments', 'appointment_bookings', 'bookings'];
  let fetchedData: any[] = [];
  let success = false;

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        fetchedData = data.map((item: any) => ({
          id: item.id || item.reference_id || Math.random().toString(),
          referenceId: item.reference_id || item.referenceId || 'APT-N/A',
          name: item.name || item.full_name || 'Anonymous Client',
          phone: item.phone || 'N/A',
          email: item.email || 'N/A',
          companyName: item.company_name || item.companyName || '',
          appointmentDate: item.appointment_date || item.appointmentDate || item.created_at?.split('T')[0] || 'Pending Date',
          timeSlot: item.time_slot || item.timeSlot || 'Standard Slot (10 AM - 1 PM)',
          appointmentType: item.appointment_type || item.appointmentType || 'Site Visit & Geotechnical Inspection',
          projectLocation: item.project_location || item.projectLocation || 'Haldia / WB',
          notes: item.notes || item.requirements || item.message || '',
          status: item.status || 'pending',
          createdAt: item.created_at || item.createdAt || new Date().toISOString(),
          source: 'supabase'
        }));
        success = true;
        break;
      }
    } catch (e) {
      console.warn(`Query on table ${table} failed`, e);
    }
  }

  // If Supabase returned empty or had no table, merge with local storage backup
  const localRaw = localStorage.getItem('sri_sj_appointment_submissions');
  const localList = localRaw ? JSON.parse(localRaw) : [];
  const localParsed: AdminBookingRecord[] = localList.map((item: any, idx: number) => ({
    id: item.id || `local-apt-${idx}`,
    referenceId: item.reference_id || item.referenceId || `APT-${Date.now().toString().slice(-4)}`,
    name: item.name || 'Anonymous Client',
    phone: item.phone || 'N/A',
    email: item.email || 'N/A',
    companyName: item.company_name || item.companyName || '',
    appointmentDate: item.appointment_date || item.appointmentDate || 'Requested',
    timeSlot: item.time_slot || item.timeSlot || 'Morning Slot',
    appointmentType: item.appointment_type || item.appointmentType || 'Site Visit',
    projectLocation: item.project_location || item.projectLocation || 'West Bengal',
    notes: item.notes || item.message || '',
    status: item.status || 'pending',
    createdAt: item.created_at || item.savedAt || new Date().toISOString(),
    source: 'local_backup'
  }));

  // Merge unique by referenceId
  const map = new Map<string, AdminBookingRecord>();
  fetchedData.forEach(item => map.set(item.referenceId, item));
  localParsed.forEach(item => {
    if (!map.has(item.referenceId)) {
      map.set(item.referenceId, item);
    }
  });

  return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Update booking status
export const updateBookingStatus = async (
  referenceId: string,
  newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<boolean> => {
  const candidateTables = ['appointments', 'appointment_bookings', 'bookings'];
  let updatedInSupabase = false;

  for (const table of candidateTables) {
    try {
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq('reference_id', referenceId);

      if (!error) {
        updatedInSupabase = true;
        break;
      }
    } catch (e) {
      console.warn(`Update on ${table} failed`, e);
    }
  }

  // Update local storage too
  try {
    const key = 'sri_sj_appointment_submissions';
    const localRaw = localStorage.getItem(key);
    if (localRaw) {
      const list = JSON.parse(localRaw);
      const updated = list.map((item: any) => {
        if (item.reference_id === referenceId || item.referenceId === referenceId) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      localStorage.setItem(key, JSON.stringify(updated));
    }
  } catch (e) {
    console.warn('Local storage update failed', e);
  }

  return true;
};

// Fetch Quote Requests
export const fetchAllQuoteRequests = async (): Promise<AdminQuoteRecord[]> => {
  const candidateTables = ['quote_requests', 'quotes'];
  let fetchedData: any[] = [];

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        fetchedData = data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          referenceId: item.reference_id || item.referenceId || 'QT-N/A',
          name: item.name || 'Anonymous Client',
          companyName: item.company_name || item.companyName || '',
          phone: item.phone || 'N/A',
          email: item.email || 'N/A',
          serviceRequired: item.service_required || item.serviceRequired || 'Piling & Civil',
          projectLocation: item.project_location || item.projectLocation || 'West Bengal',
          estimatedTimeline: item.estimated_timeline || item.estimatedTimeline || 'Standard',
          message: item.message || '',
          status: item.status || 'new',
          createdAt: item.created_at || item.createdAt || new Date().toISOString()
        }));
        break;
      }
    } catch (e) {
      console.warn(`Quotes fetch failed on ${table}`, e);
    }
  }

  const localRaw = localStorage.getItem('sri_sj_quote_submissions');
  const localList = localRaw ? JSON.parse(localRaw) : [];
  const localParsed: AdminQuoteRecord[] = localList.map((item: any, idx: number) => ({
    id: item.id || `local-qt-${idx}`,
    referenceId: item.reference_id || item.referenceId || `QT-${Date.now().toString().slice(-4)}`,
    name: item.name || 'Anonymous Client',
    companyName: item.company_name || item.companyName || '',
    phone: item.phone || 'N/A',
    email: item.email || 'N/A',
    serviceRequired: item.service_required || item.serviceRequired || 'Bored Piling',
    projectLocation: item.project_location || item.projectLocation || 'Haldia',
    estimatedTimeline: item.estimated_timeline || item.estimatedTimeline || '',
    message: item.message || '',
    status: item.status || 'new',
    createdAt: item.created_at || item.savedAt || new Date().toISOString()
  }));

  const map = new Map<string, AdminQuoteRecord>();
  fetchedData.forEach(i => map.set(i.referenceId, i));
  localParsed.forEach(i => {
    if (!map.has(i.referenceId)) map.set(i.referenceId, i);
  });

  return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Fetch Career Submissions
export const fetchAllCareerApplications = async (): Promise<AdminCareerRecord[]> => {
  const candidateTables = ['career_applications', 'job_applications'];
  let fetchedData: any[] = [];

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        fetchedData = data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          referenceId: item.reference_id || 'CAR-N/A',
          fullName: item.full_name || 'Applicant',
          fatherName: item.father_name || '',
          phone: item.phone || 'N/A',
          email: item.email || 'N/A',
          positionAppliedFor: item.position_applied_for || 'Civil Engineer',
          experienceYears: item.experience_years || '0',
          cvFileName: item.cv_file_name || 'Resume.pdf',
          address: item.address || '',
          coverLetter: item.cover_letter || '',
          createdAt: item.created_at || new Date().toISOString()
        }));
        break;
      }
    } catch (e) {
      console.warn(`Career fetch failed on ${table}`, e);
    }
  }

  const localRaw = localStorage.getItem('sri_sj_career_submissions');
  const localList = localRaw ? JSON.parse(localRaw) : [];
  const localParsed: AdminCareerRecord[] = localList.map((item: any, idx: number) => ({
    id: item.id || `local-car-${idx}`,
    referenceId: item.reference_id || `CAR-${idx}`,
    fullName: item.full_name || item.fullName || 'Candidate',
    fatherName: item.father_name || item.fatherName || '',
    phone: item.phone || 'N/A',
    email: item.email || 'N/A',
    positionAppliedFor: item.position_applied_for || item.positionAppliedFor || 'Engineer',
    experienceYears: item.experience_years || item.experienceYears || '1',
    cvFileName: item.cv_file_name || item.cvFileName || 'Resume Attached',
    address: item.address || '',
    coverLetter: item.cover_letter || item.coverLetter || '',
    createdAt: item.created_at || item.savedAt || new Date().toISOString()
  }));

  const map = new Map<string, AdminCareerRecord>();
  fetchedData.forEach(i => map.set(i.referenceId, i));
  localParsed.forEach(i => {
    if (!map.has(i.referenceId)) map.set(i.referenceId, i);
  });

  return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Fetch Contact Inquiries
export const fetchAllContactSubmissions = async (): Promise<AdminContactRecord[]> => {
  const candidateTables = ['contact_submissions', 'contacts', 'inquiries'];
  let fetchedData: any[] = [];

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        fetchedData = data.map((item: any) => ({
          id: item.id || Math.random().toString(),
          referenceId: item.reference_id || item.referenceId || 'CNT-N/A',
          name: item.name || 'Anonymous Sender',
          companyName: item.company_name || item.companyName || '',
          phone: item.phone || 'N/A',
          email: item.email || 'N/A',
          serviceRequired: item.service_required || item.serviceRequired || 'General Construction',
          projectLocation: item.project_location || item.projectLocation || 'West Bengal',
          message: item.message || item.notes || '',
          createdAt: item.created_at || item.createdAt || new Date().toISOString()
        }));
        break;
      }
    } catch (e) {
      console.warn(`Contact fetch failed on ${table}`, e);
    }
  }

  const localRaw = localStorage.getItem('sri_sj_contact_submissions');
  const localList = localRaw ? JSON.parse(localRaw) : [];
  const localParsed: AdminContactRecord[] = localList.map((item: any, idx: number) => ({
    id: item.id || `local-cnt-${idx}`,
    referenceId: item.reference_id || item.referenceId || `CNT-${Date.now().toString().slice(-4)}`,
    name: item.name || 'Anonymous Sender',
    companyName: item.company_name || item.companyName || '',
    phone: item.phone || 'N/A',
    email: item.email || 'N/A',
    serviceRequired: item.service_required || item.serviceRequired || 'Inquiry',
    projectLocation: item.project_location || item.projectLocation || 'Haldia',
    message: item.message || '',
    createdAt: item.created_at || item.savedAt || new Date().toISOString()
  }));

  const map = new Map<string, AdminContactRecord>();
  fetchedData.forEach(i => map.set(i.referenceId, i));
  localParsed.forEach(i => {
    if (!map.has(i.referenceId)) map.set(i.referenceId, i);
  });

  return Array.from(map.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

