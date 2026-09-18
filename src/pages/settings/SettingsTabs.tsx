import {
  Bell,
  Settings2,
  UserRound,
} from "lucide-react";

export type SettingsTab =
  | "profile"
  | "notifications"
  | "application";

interface SettingsTabsProps {
  activeTab: SettingsTab;

  onChange: (
    tab: SettingsTab
  ) => void;
}

const tabs: {
  id: SettingsTab;
  label: string;
  icon: typeof UserRound;
}[] = [
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "application",
    label: "Application",
    icon: Settings2,
  },
];

const SettingsTabs = ({
  activeTab,
  onChange,
}: SettingsTabsProps) => {
  return (
    <div className="border-b border-slate-200">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                onChange(tab.id)
              }
              className={`
                flex shrink-0 items-center gap-2
                border-b-2 px-5 py-4
                text-sm font-medium transition
                ${
                  active
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }
              `}
            >
              <Icon size={17} />

              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsTabs;