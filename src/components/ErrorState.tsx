import { AlertCircle } from "lucide-react";

import Button from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = "Something went wrong.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertCircle size={24} />
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">
        Unable to load data
      </h3>

      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {message}
      </p>

      {onRetry && (
        <Button
          className="mt-5"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;