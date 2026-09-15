import { mockLeads } from "../data/leads";

import type {
  Lead,
  LeadFormData,
} from "../types/leadTypes";

const STORAGE_KEY = "crm_leads";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const initialize = (): Lead[] => {
  const existing =
    localStorage.getItem(STORAGE_KEY);

  if (existing) {
    try {
      return JSON.parse(existing) as Lead[];
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mockLeads)
  );

  return mockLeads;
};

const save = (leads: Lead[]) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(leads)
  );
};

export const leadService = {
  async getAll(): Promise<Lead[]> {
    await delay(400);

    return initialize();
  },

  async getById(
    id: string
  ): Promise<Lead | undefined> {
    await delay(250);

    const leads = initialize();

    return leads.find(
      (lead) => lead.id === id
    );
  },

  async create(
    data: LeadFormData
  ): Promise<Lead> {
    await delay(400);

    const leads = initialize();

    const newLead: Lead = {
      ...data,

      id: `LEAD-${Date.now()}`,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    save([newLead, ...leads]);

    return newLead;
  },

  async update(
    id: string,
    data: LeadFormData
  ): Promise<Lead> {
    await delay(400);

    const leads = initialize();

    const index = leads.findIndex(
      (lead) => lead.id === id
    );

    if (index === -1) {
      throw new Error("Lead not found");
    }

    const updatedLead: Lead = {
      ...leads[index],
      ...data,
      updatedAt:
        new Date().toISOString(),
    };

    leads[index] = updatedLead;

    save(leads);

    return updatedLead;
  },

  async delete(id: string): Promise<void> {
    await delay(300);

    const leads = initialize();

    const filtered = leads.filter(
      (lead) => lead.id !== id
    );

    save(filtered);
  },
};