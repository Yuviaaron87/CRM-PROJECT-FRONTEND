import type {
  Contact,
} from "../types/contactTypes";

export const mockContacts: Contact[] = [
  {
    id: "CONTACT-001",

    firstName: "Arun",
    lastName: "Kumar",

    email: "arun@abctech.com",
    phone: "+91 98765 43210",

    company: "ABC Technologies",
    jobTitle: "IT Manager",

    leadId: "LEAD-001",

    address: "Guindy",
    city: "Chennai",

    notes:
      "Primary contact for CRM implementation discussion.",

    createdAt: "2026-09-12",
  },

  {
    id: "CONTACT-002",

    firstName: "Priya",
    lastName: "Sharma",

    email: "priya@nexa.com",
    phone: "+91 91234 56789",

    company: "Nexa Solutions",
    jobTitle: "Business Manager",

    leadId: "LEAD-002",

    address: "Whitefield",
    city: "Bengaluru",

    notes:
      "Interested in lead tracking and reporting features.",

    createdAt: "2026-09-11",
  },

  {
    id: "CONTACT-003",

    firstName: "Karthik",
    lastName: "Raj",

    email: "karthik@vertex.com",
    phone: "+91 99887 76655",

    company: "Vertex Systems",
    jobTitle: "Founder",

    leadId: "LEAD-003",

    address: "RS Puram",
    city: "Coimbatore",

    notes:
      "Founder and primary decision maker.",

    createdAt: "2026-09-10",
  },

  {
    id: "CONTACT-004",

    firstName: "Sneha",
    lastName: "Patel",

    email: "sneha@cloudedge.com",
    phone: "+91 90001 22334",

    company: "CloudEdge",
    jobTitle: "Operations Head",

    leadId: "LEAD-004",

    address: "Hitech City",
    city: "Hyderabad",

    notes:
      "Discussing proposal and implementation timeline.",

    createdAt: "2026-09-09",
  },

  {
    id: "CONTACT-005",

    firstName: "Ramesh",
    lastName: "Babu",

    email: "ramesh@futuretech.com",
    phone: "+91 98888 22331",

    company: "Future Tech",
    jobTitle: "Sales Head",

    address: "Anna Nagar",
    city: "Chennai",

    notes:
      "Contact created directly without an associated lead.",

    createdAt: "2026-09-08",
  },

  {
    id: "CONTACT-006",

    firstName: "Meera",
    lastName: "Nair",

    email: "meera@brightlabs.com",
    phone: "+91 92222 55667",

    company: "Bright Labs",
    jobTitle: "Product Manager",

    leadId: "LEAD-007",

    address: "Kakkanad",
    city: "Kochi",

    notes:
      "Previous lead contact.",

    createdAt: "2026-09-07",
  },
];