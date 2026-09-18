import {
  useDroppable,
} from "@dnd-kit/core";

import {
  Plus,
} from "lucide-react";

import type {
  Deal,
  DealStage,
} from "../../types/dealTypes";

import DealCard from "./DealCard";

interface Props {
  id: DealStage;

  title: string;

  deals: Deal[];

  users: {
    id: string;
    name: string;
  }[];

  onAddDeal: (
    stage: DealStage
  ) => void;

  onDelete: (
    deal: Deal
  ) => void;
}

const DealColumn = ({
  id,
  title,
  deals,
  users,
  onAddDeal,
  onDelete,
}: Props) => {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id,
  });

  const totalValue =
    deals.reduce(
      (sum, deal) =>
        sum + deal.value,
      0
    );

  const getUserName = (
    userId: string
  ) => {
    return (
      users.find(
        (user) =>
          user.id === userId
      )?.name ??
      "Unassigned"
    );
  };

  return (
    <section className="w-[310px] shrink-0">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-700">
              {title}
            </h2>

            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
              {deals.length}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            ₹
            {totalValue.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onAddDeal(id)
          }
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-blue-600"
        >
          <Plus size={17} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-[500px] space-y-3 rounded-xl border p-3 transition ${
          isOver
            ? "border-blue-300 bg-blue-50"
            : "border-slate-200 bg-slate-100/70"
        }`}
      >
        {deals.length >
        0 ? (
          deals.map(
            (deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                assignedUserName={getUserName(
                  deal.assignedUserId
                )}
                onDelete={
                  onDelete
                }
              />
            )
          )
        ) : (
          <div className="flex h-28 items-center justify-center rounded-lg border border-dashed border-slate-300 text-center">
            <p className="text-xs text-slate-400">
              Drop deals here
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DealColumn;