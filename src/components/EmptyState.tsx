import {
  Inbox,
} from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = "No data found",
  description =
    "There are no records to display.",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
        <Inbox size={22} />
      </div>

      <h3 className="mt-4 font-semibold text-slate-800">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;