import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (
    page: number
  ) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
      <p className="text-sm text-slate-500">
        Page{" "}
        <span className="font-medium text-slate-800">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-800">
          {totalPages}
        </span>
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} />
        </button>

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
          className="rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;