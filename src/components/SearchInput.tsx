import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <Search
        size={17}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="search"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          w-full rounded-lg border border-slate-300
          bg-white py-2.5 pl-10 pr-10 text-sm
          text-slate-800 outline-none
          transition
          placeholder:text-slate-400
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-100
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;