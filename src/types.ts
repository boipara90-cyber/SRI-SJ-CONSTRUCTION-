export interface ServiceItem {
  id: string;
  title: string;
  category: 'piling' | 'civil' | 'industrial' | 'earthwork';
  shortDescription: string;
  fullDescription: string;
  features: string[];
  equipmentUsed: string[];
  imageUrl: string;
  iconName: string;
}

export interface PilingFeature {
  id: string;
  title: string;
  description: string;
  diameterRange?: string;
  depthRange?: string;
  bestFor: string;
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client?: string;
  location: string;
  typeOfWork: string;
  category: 'piling' | 'industrial' | 'civil';
  description: string;
  isPlaceholder: boolean;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  imageUrl: string;
  year?: string;
  highlights?: string[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  specification: string;
  capacity: string;
  status: 'Ready for Deployment' | 'Active On Site' | 'Maintenance';
  description: string;
  imageUrl: string;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract';
  experience: string;
  description: string;
  requirements: string[];
}

export interface CareerApplication {
  fullName: string;
  fatherName: string;
  age: string;
  aadhaarNumber?: string;
  address: string;
  phone: string;
  email: string;
  positionAppliedFor: string;
  experienceYears: string;
  cvFileName?: string;
  coverLetter?: string;
}

export interface QuoteRequest {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  serviceRequired: string;
  projectLocation: string;
  estimatedTimeline?: string;
  message: string;
}
