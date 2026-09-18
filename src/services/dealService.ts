import {
  mockDeals,
} from "../data/deals";

import type {
  Deal,
  DealFormData,
  DealStage,
} from "../types/dealTypes";

const STORAGE_KEY =
  "crm_deals";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const initialize = (): Deal[] => {
  const stored =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (stored) {
    try {
      return JSON.parse(
        stored
      ) as Deal[];
    } catch {
      localStorage.removeItem(
        STORAGE_KEY
      );
    }
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mockDeals)
  );

  return mockDeals;
};

const save = (
  deals: Deal[]
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(deals)
  );
};

export const dealService = {
  async getAll(): Promise<
    Deal[]
  > {
    await delay(400);

    return initialize();
  },

  async getById(
    id: string
  ): Promise<Deal | undefined> {
    await delay(300);

    return initialize().find(
      (deal) => deal.id === id
    );
  },

  async create(
    data: DealFormData
  ): Promise<Deal> {
    await delay(400);

    const deals = initialize();

    const newDeal: Deal = {
      id: `DEAL-${Date.now()}`,

      title: data.title,

      company: data.company,

      value:
        Number(data.value) || 0,

      stage: data.stage,

      priority:
        data.priority,

      assignedUserId:
        data.assignedUserId,

      leadId:
        data.leadId ||
        undefined,

      expectedCloseDate:
        data.expectedCloseDate,

      description:
        data.description,

      createdAt:
        new Date().toISOString(),

      updatedAt:
        new Date().toISOString(),
    };

    save([
      newDeal,
      ...deals,
    ]);

    return newDeal;
  },

  async update(
    id: string,
    data: DealFormData
  ): Promise<Deal> {
    await delay(400);

    const deals = initialize();

    const index =
      deals.findIndex(
        (deal) =>
          deal.id === id
      );

    if (index === -1) {
      throw new Error(
        "Deal not found"
      );
    }

    const updatedDeal: Deal = {
      ...deals[index],

      title: data.title,

      company: data.company,

      value:
        Number(data.value) || 0,

      stage: data.stage,

      priority:
        data.priority,

      assignedUserId:
        data.assignedUserId,

      leadId:
        data.leadId ||
        undefined,

      expectedCloseDate:
        data.expectedCloseDate,

      description:
        data.description,

      updatedAt:
        new Date().toISOString(),
    };

    deals[index] =
      updatedDeal;

    save(deals);

    return updatedDeal;
  },

  async updateStage(
    id: string,
    stage: DealStage
  ): Promise<Deal> {
    await delay(150);

    const deals = initialize();

    const index =
      deals.findIndex(
        (deal) =>
          deal.id === id
      );

    if (index === -1) {
      throw new Error(
        "Deal not found"
      );
    }

    deals[index] = {
      ...deals[index],

      stage,

      updatedAt:
        new Date().toISOString(),
    };

    save(deals);

    return deals[index];
  },

  async delete(
    id: string
  ): Promise<void> {
    await delay(300);

    const deals =
      initialize().filter(
        (deal) =>
          deal.id !== id
      );

    save(deals);
  },
};