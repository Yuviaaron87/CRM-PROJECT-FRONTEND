import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden w-80 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search size={17} className="text-slate-400" />

          <input
            type="search"
            placeholder="Search CRM..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <Bell size={20} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            YA
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-800">
              CRM Admin
            </p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;