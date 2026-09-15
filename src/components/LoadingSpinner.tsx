interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner = ({
  text = "Loading...",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

      <p className="mt-3 text-sm text-slate-500">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;