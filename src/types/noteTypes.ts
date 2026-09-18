export type NoteEntityType =
  | "lead"
  | "contact";

export interface Note {
  id: string;

  content: string;

  entityType: NoteEntityType;

  entityId: string;

  createdBy: string;

  createdAt: string;

  updatedAt?: string;
}

export interface NoteFormData {
  content: string;
}