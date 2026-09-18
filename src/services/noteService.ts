import {
  mockNotes,
} from "../data/note";

import type {
  Note,
  NoteEntityType,
  NoteFormData,
} from "../types/noteTypes";

const STORAGE_KEY =
  "crm_notes";

const delay = (
  ms: number
) =>
  new Promise<void>(
    (resolve) => {
      setTimeout(resolve, ms);
    }
  );

const initialize =
  (): Note[] => {
    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (stored) {
      try {
        return JSON.parse(
          stored
        ) as Note[];
      } catch {
        localStorage.removeItem(
          STORAGE_KEY
        );
      }
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        mockNotes
      )
    );

    return mockNotes;
  };

const save = (
  notes: Note[]
) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notes)
  );
};

export const noteService = {
  async getAll(): Promise<
    Note[]
  > {
    await delay(300);

    return initialize();
  },

  async getByEntity(
    entityType: NoteEntityType,
    entityId: string
  ): Promise<Note[]> {
    await delay(300);

    return initialize()
      .filter(
        (note) =>
          note.entityType ===
            entityType &&
          note.entityId ===
            entityId
      )
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      );
  },

  async getById(
    id: string
  ): Promise<
    Note | undefined
  > {
    await delay(200);

    return initialize().find(
      (note) =>
        note.id === id
    );
  },

  async create(
    entityType: NoteEntityType,
    entityId: string,
    data: NoteFormData,
    createdBy = "USER-001"
  ): Promise<Note> {
    await delay(300);

    const notes =
      initialize();

    const note: Note = {
      id: `NOTE-${Date.now()}`,

      content:
        data.content.trim(),

      entityType,

      entityId,

      createdBy,

      createdAt:
        new Date().toISOString(),
    };

    save([
      note,
      ...notes,
    ]);

    return note;
  },

  async update(
    id: string,
    data: NoteFormData
  ): Promise<Note> {
    await delay(300);

    const notes =
      initialize();

    const index =
      notes.findIndex(
        (note) =>
          note.id === id
      );

    if (index === -1) {
      throw new Error(
        "Note not found"
      );
    }

    const updatedNote: Note = {
      ...notes[index],

      content:
        data.content.trim(),

      updatedAt:
        new Date().toISOString(),
    };

    notes[index] =
      updatedNote;

    save(notes);

    return updatedNote;
  },

  async delete(
    id: string
  ): Promise<void> {
    await delay(250);

    const notes =
      initialize().filter(
        (note) =>
          note.id !== id
      );

    save(notes);
  },
};