import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2.5
        text-sm font-medium
        transition
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
};

export default Button;