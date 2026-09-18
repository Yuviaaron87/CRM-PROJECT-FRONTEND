import {
  Clock3,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

import {
  useState,
} from "react";

import type {
  Note,
} from "../../types/noteTypes";

interface Props {
  note: Note;

  authorName: string;

  onEdit: (
    note: Note
  ) => void;

  onDelete: (
    note: Note
  ) => void;
}

const NoteCard = ({
  note,
  authorName,
  onEdit,
  onDelete,
}: Props) => {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const formattedDate =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(
      new Date(
        note.createdAt
      )
    );

  return (
    <div className="relative flex gap-4">
      {/* Timeline */}

      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <UserRound
            size={16}
          />
        </div>

        <div className="mt-2 h-full w-px bg-slate-200" />
      </div>

      {/* Note */}

      <div className="mb-5 flex-1 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {authorName}
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
              <Clock3
                size={12}
              />

              {formattedDate}

              {note.updatedAt && (
                <span>
                  • Edited
                </span>
              )}
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (previous) =>
                    !previous
                )
              }
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <MoreHorizontal
                size={17}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-10 z-20 w-36 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    onEdit(
                      note
                    );

                    setMenuOpen(
                      false
                    );
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
                >
                  <Pencil
                    size={14}
                  />

                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onDelete(
                      note
                    );

                    setMenuOpen(
                      false
                    );
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2
                    size={14}
                  />

                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
          {note.content}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;