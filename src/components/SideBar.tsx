import { NavLink } from "react-router";
import { X } from "lucide-react";

import { NAVIGATION_ITEMS } from "../constants/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          bg-slate-950 text-white
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              CRM<span className="text-blue-500">Flow</span>
            </h1>
            <p className="text-xs text-slate-500">Customer Management</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1 p-4">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3 rounded-lg px-3 py-2.5
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }
                  `
                }
              >
                <Icon size={19} />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-4 right-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
            <p className="text-xs text-slate-500">Workspace</p>
            <p className="mt-1 truncate text-sm font-medium">
              CRM Development
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;