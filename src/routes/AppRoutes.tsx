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
import AddContact from "../pages/contact/AddContact";
import ContactDetails from "../pages/contact/ContactDetails";
import EditContact from "../pages/contact/EditContact";
import AddDeal from "../pages/pipeline/AddDeal";
import EditDeal from "../pages/pipeline/EditDeal";
import DealDetails from "../pages/pipeline/DealDetails";
import AddTask from "../pages/tasks/AddTask";
import TaskDetails from "../pages/tasks/TaskDetails";
import EditTask from "../pages/tasks/EditTask";
import Notes from "../pages/note/Notes";

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
          path: "contacts/add",
          element: <AddContact />
        },
        {
          path: "contacts/:id",
          element: <ContactDetails />
        },
        {
          path: "contacts/:id/edit",
          element: <EditContact />
        },
        {
          path: "pipeline",
          element: <Pipeline />,
        },
        {
          path: "pipeline/add",
          element: <AddDeal />
        },
        {
          path: "pipeline/:id",
          element: <DealDetails />
        },
        {
          path: "pipeline/:id/edit",
          element: <EditDeal />
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "tasks/add",
          element: <AddTask />
        },
        {
          path: "tasks/:id",
          element: <TaskDetails />
        },
        {
          path: "tasks/:id/edit",
          element: <EditTask />
        },
        {
            path: "notes",
            element: <Notes />
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