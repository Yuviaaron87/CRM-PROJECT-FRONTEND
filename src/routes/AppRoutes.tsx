import { useRoutes } from "react-router";

import MainLayout from "../layout/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Leads from "../pages/leads/Leads";
import Contacts from "../pages/contact/Contacts";
import Pipeline from "../pages/pipeline/Pipeline";
import Tasks from "../pages/tasks/Tasks";
import Settings from "../pages/settings/Settings";
import NotFound from "../pages/notFound/NotFound";
import AddLead from "../pages/leads/AddLead";
import LeadDetails from "../pages/leads/LeadDetails";
import EditLead from "../pages/leads/EditLead";

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
       {
          path: "leads",
          element: <Leads />,
        }, 

        {
            path: "leads/add",
            element: <AddLead />
        },
        {
            path: "leads/:id",
            element: <LeadDetails />
        },
        {
            path: "leads/:id/edit",
            element: <EditLead />
        },
        {
          path: "contacts",
          element: <Contacts />,
        },
        {
          path: "pipeline",
          element: <Pipeline />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;