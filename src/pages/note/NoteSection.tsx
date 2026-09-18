import {
  FileText,
  Plus,
  Search,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import toast from "react-hot-toast";

import Modal from "../../pages/note/Modal";
import ConfirmDialog from "../../components/ConformDialog";
import LoadingSpinner from "../../components/LoadingSpinner";

import NoteCard from "./NoteCard";
import NoteForm from "./NoteForm";

import {
  users,
} from "../../data/users";

import {
  noteService,
} from "../../services/noteService";

import type {
  Note,
  NoteEntityType,
  NoteFormData,
} from "../../types/noteTypes";

interface Props {
  entityType:
    NoteEntityType;

  entityId: string;
}

const NotesSection = ({
  entityType,
  entityId,
}: Props) => {
  const [
    notes,
    setNotes,
  ] = useState<Note[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    editingNote,
    setEditingNote,
  ] =
    useState<Note | null>(
      null
    );

  const [
    deletingNote,
    setDeletingNote,
  ] =
    useState<Note | null>(
      null
    );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const loadNotes =
    async () => {
      try {
        setLoading(true);

        const data =
          await noteService.getByEntity(
            entityType,
            entityId
          );

        setNotes(data);
      } catch {
        toast.error(
          "Failed to load notes"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadNotes();
  }, [
    entityType,
    entityId,
  ]);

  const filteredNotes =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return notes;
      }

      return notes.filter(
        (note) =>
          note.content
            .toLowerCase()
            .includes(query)
      );
    }, [notes, search]);

  const getAuthorName = (
    userId: string
  ) =>
    users.find(
      (user) =>
        user.id === userId
    )?.name ?? "CRM User";

  const openAddModal =
    () => {
      setEditingNote(null);
      setFormOpen(true);
    };

  const openEditModal = (
    note: Note
  ) => {
    setEditingNote(note);
    setFormOpen(true);
  };

  const closeForm =
    () => {
      if (saving) {
        return;
      }

      setFormOpen(false);
      setEditingNote(null);
    };

  const handleSubmit =
    async (
      data: NoteFormData
    ) => {
      try {
        setSaving(true);

        if (editingNote) {
          const updated =
            await noteService.update(
              editingNote.id,
              data
            );

          setNotes(
            (previous) =>
              previous.map(
                (note) =>
                  note.id ===
                  updated.id
                    ? updated
                    : note
              )
          );

          toast.success(
            "Note updated successfully"
          );
        } else {
          const created =
            await noteService.create(
              entityType,
              entityId,
              data
            );

          setNotes(
            (previous) => [
              created,
              ...previous,
            ]
          );

          toast.success(
            "Note added successfully"
          );
        }

        setFormOpen(false);
        setEditingNote(null);
      } catch {
        toast.error(
          editingNote
            ? "Failed to update note"
            : "Failed to add note"
        );
      } finally {
        setSaving(false);
      }
    };

  const handleDelete =
    async () => {
      if (!deletingNote) {
        return;
      }

      try {
        setDeleting(true);

        await noteService.delete(
          deletingNote.id
        );

        setNotes(
          (previous) =>
            previous.filter(
              (note) =>
                note.id !==
                deletingNote.id
            )
        );

        toast.success(
          "Note deleted successfully"
        );

        setDeletingNote(
          null
        );
      } catch {
        toast.error(
          "Failed to delete note"
        );
      } finally {
        setDeleting(false);
      }
    };

  return (
    <>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}

        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <FileText
                size={18}
                className="text-blue-600"
              />

              <h2 className="font-semibold text-slate-900">
                Notes
              </h2>

              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                {notes.length}
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Keep important
              information and
              customer interactions
              in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={
              openAddModal
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={16} />

            Add Note
          </button>
        </div>

        {/* Search */}

        {notes.length > 0 && (
          <div className="border-b border-slate-100 p-5">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Search notes..."
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        )}

        {/* Notes */}

        <div className="p-5">
          {loading ? (
            <LoadingSpinner text="Loading notes..." />
          ) : filteredNotes.length >
            0 ? (
            <div>
              {filteredNotes.map(
                (note) => (
                  <NoteCard
                    key={
                      note.id
                    }
                    note={note}
                    authorName={getAuthorName(
                      note.createdBy
                    )}
                    onEdit={
                      openEditModal
                    }
                    onDelete={
                      setDeletingNote
                    }
                  />
                )
              )}
            </div>
          ) : search ? (
            <div className="py-10 text-center">
              <Search
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 text-sm font-medium text-slate-700">
                No notes found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try another
                search term.
              </p>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <FileText
                  size={22}
                  className="text-slate-400"
                />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-700">
                No notes yet
              </p>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-400">
                Add a note to
                record important
                information,
                conversations or
                follow-up details.
              </p>

              <button
                type="button"
                onClick={
                  openAddModal
                }
                className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Add first note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}

      <Modal
        open={formOpen}
        title={
          editingNote
            ? "Edit Note"
            : "Add Note"
        }
        onClose={
          closeForm
        }
      >
        <NoteForm
          initialValue={
            editingNote?.content ??
            ""
          }
          loading={saving}
          submitLabel={
            editingNote
              ? "Update Note"
              : "Add Note"
          }
          onSubmit={
            handleSubmit
          }
          onCancel={
            closeForm
          }
        />
      </Modal>

      {/* Delete */}

      <ConfirmDialog
        open={Boolean(
          deletingNote
        )}
        title="Delete Note?"
        description="Are you sure you want to delete this note? This action cannot be undone."
        loading={deleting}
        onCancel={() =>
          setDeletingNote(
            null
          )
        }
        onConfirm={
          handleDelete
        }
      />
    </>
  );
};

export default NotesSection;