import {
  mockContacts,
} from "../data/contacts";

import type {
  Contact,
  ContactFormData,
} from "../types/contactTypes";

const STORAGE_KEY = "crm_contacts";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const initialize = (): Contact[] => {
  const existing =
    localStorage.getItem(STORAGE_KEY);

  if (existing) {
    try {
      return JSON.parse(
        existing
      ) as Contact[];
    } catch {
      localStorage.removeItem(
        STORAGE_KEY
      );
    }
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mockContacts)
  );

  return mockContacts;
};

const save = (
  contacts: Contact[]
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(contacts)
  );
};

export const contactService = {
  async getAll(): Promise<Contact[]> {
    await delay(400);

    return initialize();
  },

  async getById(
    id: string
  ): Promise<Contact | undefined> {
    await delay(300);

    const contacts = initialize();

    return contacts.find(
      (contact) =>
        contact.id === id
    );
  },

  async create(
    data: ContactFormData
  ): Promise<Contact> {
    await delay(400);

    const contacts = initialize();

    const contact: Contact = {
      ...data,

      leadId:
        data.leadId || undefined,

      id: `CONTACT-${Date.now()}`,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    save([
      contact,
      ...contacts,
    ]);

    return contact;
  },

  async update(
    id: string,
    data: ContactFormData
  ): Promise<Contact> {
    await delay(400);

    const contacts = initialize();

    const index =
      contacts.findIndex(
        (contact) =>
          contact.id === id
      );

    if (index === -1) {
      throw new Error(
        "Contact not found"
      );
    }

    const updated: Contact = {
      ...contacts[index],
      ...data,

      leadId:
        data.leadId || undefined,

      updatedAt:
        new Date().toISOString(),
    };

    contacts[index] = updated;

    save(contacts);

    return updated;
  },

  async delete(
    id: string
  ): Promise<void> {
    await delay(300);

    const contacts = initialize();

    const filtered =
      contacts.filter(
        (contact) =>
          contact.id !== id
      );

    save(filtered);
  },
};