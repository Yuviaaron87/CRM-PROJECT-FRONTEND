import {
  AlertTriangle,
  X,
} from "lucide-react";

import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  open,
  title,
  description,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between p-5">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle size={20} />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                {title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-5 py-4">
          <Button
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={onConfirm}
          >
            Delete Lead
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;