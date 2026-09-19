import {
  Bell,
  LogOut,
  Menu,
  Search,
} from "lucide-react";

import {
  useNavigate,
} from "react-router";

import {
  useAuth,
} from "../context/AuthContext";

import {
  ROUTES,
} from "../constants/route";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({
  onMenuClick,
}: NavbarProps) => {
  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {
    logout();

    navigate(
      ROUTES.LOGIN,
      {
        replace: true,
      }
    );
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      {/* Left */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden sm:block">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search CRM..."
            className="w-72 rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
            {user?.initials ??
              "CA"}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name ??
                "CRM Admin"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.role ??
                "Administrator"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />

          <span className="hidden md:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;