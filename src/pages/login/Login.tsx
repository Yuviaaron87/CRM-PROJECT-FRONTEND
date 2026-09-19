import {
  useEffect,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router";

import toast from "react-hot-toast";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  ROUTES,
} from "../../constants/route";

interface LocationState {
  from?: {
    pathname?: string;
  };
}

const Login = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    login,
    isAuthenticated,
    isLoading,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [emailError, setEmailError] =
    useState("");

  const [
    passwordError,
    setPasswordError,
  ] = useState("");

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [email, password]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  const validate = () => {
    let valid = true;

    const emailValue =
      email.trim();

    if (!emailValue) {
      setEmailError(
        "Email is required"
      );

      valid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        emailValue
      )
    ) {
      setEmailError(
        "Enter a valid email address"
      );

      valid = false;
    }

    if (!password) {
      setPasswordError(
        "Password is required"
      );

      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (
    event:
      React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      toast.success(
        "Login successful"
      );

      const state =
        location.state as
          | LocationState
          | null;

      const destination =
        state?.from?.pathname ??
        ROUTES.DASHBOARD;

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              CRM
              <span className="text-blue-500">
                Flow
              </span>
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Customer Management
            </p>
          </div>

          <div className="max-w-lg">
            <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
              CRM Management Platform
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight">
              Manage your customer
              relationships in one
              place.
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Manage leads, contacts,
              deals, follow-ups, notes
              and your sales pipeline
              through a single CRM
              workspace.
            </p>
          </div>

          <p className="text-xs text-slate-500">
            © 2026 CRMFlow
          </p>
        </div>

        {/* Login Section */}
        <div className="flex items-center justify-center p-5 sm:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
              <h1 className="text-2xl font-bold text-slate-950">
                CRM
                <span className="text-blue-600">
                  Flow
                </span>
              </h1>

              <p className="text-sm text-slate-500">
                Customer Management
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your login
                details to access your
                CRM workspace.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target
                          .value
                      )
                    }
                    placeholder="admin@crmflow.com"
                    className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:ring-2 ${
                      emailError
                        ? "border-red-400 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />
                </div>

                {emailError && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target
                          .value
                      )
                    }
                    placeholder="Enter your password"
                    className={`w-full rounded-xl border bg-white py-3 pl-11 pr-12 text-sm text-slate-800 outline-none transition focus:ring-2 ${
                      passwordError
                        ? "border-red-400 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}
                  </button>
                </div>

                {passwordError && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Demo credentials */}
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-xs font-semibold text-blue-700">
                  Demo Login
                </p>

                <p className="mt-1 text-xs text-blue-600">
                  Email:
                  {" "}
                  admin@crmflow.com
                </p>

                <p className="mt-1 text-xs text-blue-600">
                  Password:
                  {" "}
                  Admin@123
                </p>
              </div>

              {/* Login */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-slate-400">
              Secure access to your
              CRM workspace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;