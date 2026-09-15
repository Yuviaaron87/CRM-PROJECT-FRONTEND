import {
  LayoutDashboard,
  Users,
  ContactRound,
  Kanban,
  ListTodo,
  Settings,
} from "lucide-react";

import { ROUTES } from "./route";

export const NAVIGATION_ITEMS = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    path: ROUTES.LEADS,
    icon: Users,
  },
  {
    label: "Contacts",
    path: ROUTES.CONTACTS,
    icon: ContactRound,
  },
  {
    label: "Pipeline",
    path: ROUTES.PIPELINE,
    icon: Kanban,
  },
  {
    label: "Tasks",
    path: ROUTES.TASKS,
    icon: ListTodo,
  },
  {
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: Settings,
  },
];