import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router";

import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../constants/route";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="mt-3 text-sm text-slate-500">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;