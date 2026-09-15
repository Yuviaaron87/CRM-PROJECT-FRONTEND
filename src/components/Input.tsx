import type {
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full rounded-lg border bg-white px-3 py-2.5
          text-sm text-slate-900 outline-none transition
          placeholder:text-slate-400
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;