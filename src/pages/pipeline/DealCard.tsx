import {
  CalendarDays,
  GripVertical,
  MoreHorizontal,
  UserRound,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router";

import {
  useDraggable,
} from "@dnd-kit/core";

import {
  CSS,
} from "@dnd-kit/utilities";

import type {
  Deal,
} from "../../types/dealTypes";

interface DealCardProps {
  deal: Deal;

  assignedUserName: string;

  onDelete: (
    deal: Deal
  ) => void;
}

const DealCard = ({
  deal,
  assignedUserName,
  onDelete,
}: DealCardProps) => {
  const navigate =
    useNavigate();

  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: deal.id,

    data: {
      deal,
    },
  });

  const style = {
    transform:
      CSS.Translate.toString(
        transform
      ),

    opacity:
      isDragging ? 0.5 : 1,
  };

  const priorityStyle = {
    high:
      "bg-red-50 text-red-600",

    medium:
      "bg-amber-50 text-amber-600",

    low:
      "bg-emerald-50 text-emerald-600",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <button
          type="button"
          {...listeners}
          {...attributes}
          className="cursor-grab rounded p-1 text-slate-300 hover:bg-slate-100 hover:text-slate-500 active:cursor-grabbing"
          aria-label="Drag deal"
        >
          <GripVertical
            size={17}
          />
        </button>

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${priorityStyle[deal.priority]}`}
        >
          {deal.priority}
        </span>

        <div className="relative ml-auto">
          <button
            type="button"
            onClick={() =>
              setMenuOpen(
                (previous) =>
                  !previous
              )
            }
            className="rounded p-1 text-slate-400 hover:bg-slate-100"
          >
            <MoreHorizontal
              size={17}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-20 w-32 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/pipeline/${deal.id}`
                  )
                }
                className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50"
              >
                View
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/pipeline/${deal.id}/edit`
                  )
                }
                className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(
                    false
                  );

                  onDelete(deal);
                }}
                className="w-full rounded-md px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          navigate(
            `/pipeline/${deal.id}`
          )
        }
        className="block w-full text-left"
      >
        <h3 className="text-sm font-semibold text-slate-800 hover:text-blue-600">
          {deal.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {deal.company}
        </p>
      </button>

      <p className="mt-4 text-lg font-bold text-slate-900">
        ₹
        {deal.value.toLocaleString(
          "en-IN"
        )}
      </p>

      <div className="mt-4 space-y-2 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <UserRound
            size={14}
          />

          <span className="truncate">
            {assignedUserName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays
            size={14}
          />

          {deal.expectedCloseDate ||
            "No close date"}
        </div>
      </div>
    </div>
  );
};

export default DealCard;