import {
  FileText,
  Search,
  UserRound,
  Users,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router";

import toast from "react-hot-toast";

import {
  noteService,
} from "../../services/noteService";

import {
  users,
} from "../../data/users";

import type {
  Note,
  NoteEntityType,
} from "../../types/noteTypes";

const Notes = () => {
  const navigate = useNavigate();

  const [notes, setNotes] =
    useState<Note[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState<NoteEntityType | "all">(
      "all"
    );

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);

        const data =
          await noteService.getAll();

        setNotes(
          [...data].sort(
            (a, b) =>
              new Date(
                b.createdAt
              ).getTime() -
              new Date(
                a.createdAt
              ).getTime()
          )
        );
      } catch {
        toast.error(
          "Failed to load notes"
        );
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const leadNotesCount =
    notes.filter(
      (note) =>
        note.entityType ===
        "lead"
    ).length;

  const contactNotesCount =
    notes.filter(
      (note) =>
        note.entityType ===
        "contact"
    ).length;

  const filteredNotes =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      return notes.filter(
        (note) => {
          const matchesSearch =
            note.content
              .toLowerCase()
              .includes(query);

          const matchesType =
            typeFilter === "all" ||
            note.entityType ===
              typeFilter;

          return (
            matchesSearch &&
            matchesType
          );
        }
      );
    }, [
      notes,
      search,
      typeFilter,
    ]);

  const getAuthorName = (
    userId: string
  ) =>
    users.find(
      (user) =>
        user.id === userId
    )?.name ?? "CRM User";

  const handleOpenEntity = (
    note: Note
  ) => {
    if (
      note.entityType ===
      "lead"
    ) {
      navigate(
        `/leads/${note.entityId}`
      );

      return;
    }

    navigate(
      `/contacts/${note.entityId}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Notes
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View notes and customer
          interactions across your
          CRM.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Total Notes"
          value={notes.length}
          icon={
            <FileText size={20} />
          }
        />

        <StatCard
          title="Lead Notes"
          value={leadNotesCount}
          icon={
            <Users size={20} />
          }
        />

        <StatCard
          title="Contact Notes"
          value={contactNotesCount}
          icon={
            <UserRound size={20} />
          }
        />
      </div>

      {/* Search / Filter */}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search notes..."
              className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target
                  .value as
                  | NoteEntityType
                  | "all"
              )
            }
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-52"
          >
            <option value="all">
              All Notes
            </option>

            <option value="lead">
              Lead Notes
            </option>

            <option value="contact">
              Contact Notes
            </option>
          </select>
        </div>
      </div>

      {/* Notes */}

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              All Notes
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredNotes.length}{" "}
              notes found
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading notes...
              </p>
            </div>
          </div>
        ) : filteredNotes.length ===
          0 ? (
          <div className="py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
              <FileText
                size={22}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-700">
              No notes found
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Notes added to leads
              and contacts will
              appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotes.map(
              (note) => {
                const createdDate =
                  new Intl.DateTimeFormat(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute:
                        "2-digit",
                    }
                  ).format(
                    new Date(
                      note.createdAt
                    )
                  );

                return (
                  <div
                    key={note.id}
                    className="p-5 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                      <div className="flex min-w-0 gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <FileText
                            size={17}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-slate-800">
                              {getAuthorName(
                                note.createdBy
                              )}
                            </p>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${
                                note.entityType ===
                                "lead"
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-violet-50 text-violet-600"
                              }`}
                            >
                              {
                                note.entityType
                              }{" "}
                              Note
                            </span>

                            {note.updatedAt && (
                              <span className="text-xs text-slate-400">
                                Edited
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-slate-400">
                            {
                              createdDate
                            }
                          </p>

                          <p className="mt-3 max-w-4xl whitespace-pre-wrap text-sm leading-6 text-slate-600">
                            {
                              note.content
                            }
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEntity(
                            note
                          )
                        }
                        className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        View{" "}
                        {note.entityType ===
                        "lead"
                          ? "Lead"
                          : "Contact"}
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({
  title,
  value,
  icon,
}: StatCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Notes;