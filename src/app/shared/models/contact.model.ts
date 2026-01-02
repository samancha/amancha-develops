export interface ContactFormData {
  name: string;
  email: string;
  service: ServiceType;
  message: string;
}

export type ServiceType = 
  | 'ai-integration'
  | 'cloud-migration'
  | 'proof-of-concept'
  | 'corporate-training'
  | 'mentorship'
  | 'workshop'
  | 'other';

export interface ServiceOption {
  value: ServiceType;
  label: string;
}
