import { ArrowLeft, Home } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { ROUTES } from "../../constants/route";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Error
        </p>

        <h1 className="mt-2 text-8xl font-bold text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-slate-800">
          Page not found
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          The CRM page you're looking for doesn't exist or may have
          been moved.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Home size={17} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;