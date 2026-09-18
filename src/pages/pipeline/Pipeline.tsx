import {
  CircleDollarSign,
  Plus,
  Trophy,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router";

import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import toast from "react-hot-toast";

import DealColumn from "../../pages/pipeline/DealColumn";
import PipelineFilters from "../../pages/pipeline/PipelineFilters";

import ConfirmDialog from "../../components/ConformDialog";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  PIPELINE_STAGES,
} from "../../constants/pipeline";

import {
  dealService,
} from "../../services/dealService";

import type {
  Deal,
  DealPriority,
  DealStage,
} from "../../types/dealTypes";

import {
  users,
} from "../../data/users";

const Pipeline = () => {
  const navigate =
    useNavigate();

  const [
    deals,
    setDeals,
  ] = useState<Deal[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    priority,
    setPriority,
  ] =
    useState<
      DealPriority | ""
    >("");

  const [
    assignedUser,
    setAssignedUser,
  ] = useState("");

  const [
    selectedDeal,
    setSelectedDeal,
  ] =
    useState<Deal | null>(
      null
    );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  const sensors = useSensors(
    useSensor(
      PointerSensor,
      {
        activationConstraint: {
          distance: 5,
        },
      }
    )
  );

  useEffect(() => {
    const loadDeals =
      async () => {
        try {
          setLoading(true);

          const data =
            await dealService.getAll();

          setDeals(data);
        } catch {
          toast.error(
            "Failed to load pipeline"
          );
        } finally {
          setLoading(false);
        }
      };

    loadDeals();
  }, []);

  const filteredDeals =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return deals.filter(
        (deal) => {
          const matchesSearch =
            !query ||
            deal.title
              .toLowerCase()
              .includes(query) ||
            deal.company
              .toLowerCase()
              .includes(query);

          const matchesPriority =
            !priority ||
            deal.priority ===
              priority;

          const matchesUser =
            !assignedUser ||
            deal.assignedUserId ===
              assignedUser;

          return (
            matchesSearch &&
            matchesPriority &&
            matchesUser
          );
        }
      );
    }, [
      deals,
      search,
      priority,
      assignedUser,
    ]);

  const totalValue =
    deals.reduce(
      (total, deal) =>
        total + deal.value,
      0
    );

  const wonDeals =
    deals.filter(
      (deal) =>
        deal.stage === "won"
    );

  const wonValue =
    wonDeals.reduce(
      (total, deal) =>
        total + deal.value,
      0
    );

  const openDeals =
    deals.filter(
      (deal) =>
        deal.stage !== "won" &&
        deal.stage !== "lost"
    ).length;

  const handleDragEnd =
    async (
      event: DragEndEvent
    ) => {
      const { active, over } =
        event;

      if (!over) {
        return;
      }

      const dealId =
        String(active.id);

      const newStage =
        String(
          over.id
        ) as DealStage;

      const validStage =
        PIPELINE_STAGES.some(
          (stage) =>
            stage.id ===
            newStage
        );

      if (!validStage) {
        return;
      }

      const deal =
        deals.find(
          (item) =>
            item.id ===
            dealId
        );

      if (
        !deal ||
        deal.stage ===
          newStage
      ) {
        return;
      }

      const previousStage =
        deal.stage;

      // Optimistic UI update
      setDeals(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
              dealId
                ? {
                    ...item,
                    stage:
                      newStage,
                  }
                : item
          )
      );

      try {
        await dealService.updateStage(
          dealId,
          newStage
        );

        const stageName =
          PIPELINE_STAGES.find(
            (stage) =>
              stage.id ===
              newStage
          )?.label;

        toast.success(
          `Deal moved to ${stageName}`
        );
      } catch {
        // Rollback
        setDeals(
          (previous) =>
            previous.map(
              (item) =>
                item.id ===
                dealId
                  ? {
                      ...item,
                      stage:
                        previousStage,
                    }
                  : item
            )
        );

        toast.error(
          "Failed to move deal"
        );
      }
    };

  const handleDelete =
    async () => {
      if (!selectedDeal) {
        return;
      }

      try {
        setDeleting(true);

        await dealService.delete(
          selectedDeal.id
        );

        setDeals(
          (previous) =>
            previous.filter(
              (deal) =>
                deal.id !==
                selectedDeal.id
            )
        );

        toast.success(
          "Deal deleted successfully"
        );

        setSelectedDeal(
          null
        );
      } catch {
        toast.error(
          "Failed to delete deal"
        );
      } finally {
        setDeleting(false);
      }
    };

  if (loading) {
    return (
      <LoadingSpinner text="Loading pipeline..." />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Sales Pipeline
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage opportunities
            and move deals through
            your sales process.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/pipeline/add"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />

          Add Deal
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Deals"
          value={`${deals.length}`}
        />

        <StatCard
          label="Open Deals"
          value={`${openDeals}`}
        />

        <StatCard
          label="Pipeline Value"
          value={`₹${totalValue.toLocaleString(
            "en-IN"
          )}`}
          icon={
            <CircleDollarSign
              size={19}
            />
          }
        />

        <StatCard
          label="Won Value"
          value={`₹${wonValue.toLocaleString(
            "en-IN"
          )}`}
          icon={
            <Trophy
              size={19}
            />
          }
        />
      </div>

      <PipelineFilters
        search={search}
        priority={priority}
        assignedUser={
          assignedUser
        }
        users={users}
        onSearchChange={
          setSearch
        }
        onPriorityChange={
          setPriority
        }
        onUserChange={
          setAssignedUser
        }
        onReset={() => {
          setSearch("");
          setPriority("");
          setAssignedUser("");
        }}
      />

      {/* Board */}

      <DndContext
        sensors={sensors}
        onDragEnd={
          handleDragEnd
        }
      >
        <div className="overflow-x-auto pb-5">
          <div className="flex min-w-max gap-4">
            {PIPELINE_STAGES.map(
              (stage) => (
                <DealColumn
                  key={stage.id}
                  id={stage.id}
                  title={
                    stage.label
                  }
                  deals={filteredDeals.filter(
                    (deal) =>
                      deal.stage ===
                      stage.id
                  )}
                  users={
                    users
                  }
                  onAddDeal={(
                    selectedStage
                  ) =>
                    navigate(
                      `/pipeline/add?stage=${selectedStage}`
                    )
                  }
                  onDelete={
                    setSelectedDeal
                  }
                />
              )
            )}
          </div>
        </div>
      </DndContext>

      <ConfirmDialog
        open={Boolean(
          selectedDeal
        )}
        title="Delete Deal?"
        description={`Are you sure you want to delete ${
          selectedDeal?.title ??
          ""
        }? This action cannot be undone.`}
        loading={deleting}
        onCancel={() =>
          setSelectedDeal(
            null
          )
        }
        onConfirm={
          handleDelete
        }
      />
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const StatCard = ({
  label,
  value,
  icon,
}: StatCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pipeline;