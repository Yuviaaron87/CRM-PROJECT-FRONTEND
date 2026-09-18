export interface Contact {
  id: string;

  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  company: string;
  jobTitle: string;

  leadId?: string;

  address: string;
  city: string;

  notes: string;

  createdAt: string;
  updatedAt?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  company: string;
  jobTitle: string;

  leadId: string;

  address: string;
  city: string;

  notes: string;
}