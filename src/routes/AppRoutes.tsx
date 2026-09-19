import { useRoutes } from "react-router";

import MainLayout from "../layout/MainLayout";

import ProtectedRoute from "./ProtectedRoutes";

import Login from "../pages/login/Login";

import Dashboard from "../pages/dashboard/Dashboard";

import Leads from "../pages/leads/Leads";
import AddLead from "../pages/leads/AddLead";
import LeadDetails from "../pages/leads/LeadDetails";
import EditLead from "../pages/leads/EditLead";

import Contacts from "../pages/contact/Contacts";
import AddContact from "../pages/contact/AddContact";
import ContactDetails from "../pages/contact/ContactDetails";
import EditContact from "../pages/contact/EditContact";

import Pipeline from "../pages/pipeline/Pipeline";
import AddDeal from "../pages/pipeline/AddDeal";
import DealDetails from "../pages/pipeline/DealDetails";
import EditDeal from "../pages/pipeline/EditDeal";

import Tasks from "../pages/tasks/Tasks";
import AddTask from "../pages/tasks/AddTask";
import TaskDetails from "../pages/tasks/TaskDetails";
import EditTask from "../pages/tasks/EditTask";

import Notes from "../pages/note/Notes";

import Settings from "../pages/settings/Settings";

import NotFound from "../pages/notFound/NotFound";

import { ROUTES } from "../constants/route";

const AppRoutes = () => {
  return useRoutes([
    // =====================================
    // PUBLIC ROUTE
    // =====================================

    {
      path: ROUTES.LOGIN,
      element: <Login />,
    },

    // =====================================
    // PROTECTED ROUTES
    // =====================================

    {
      element: <ProtectedRoute />,

      children: [
        {
          path: "/",
          element: <MainLayout />,

          children: [
            // Dashboard
            {
              index: true,
              element: <Dashboard />,
            },

            // Leads
            {
              path: "leads",
              element: <Leads />,
            },
            {
              path: "leads/add",
              element: <AddLead />,
            },
            {
              path: "leads/:id",
              element: <LeadDetails />,
            },
            {
              path: "leads/:id/edit",
              element: <EditLead />,
            },

            // Contacts
            {
              path: "contacts",
              element: <Contacts />,
            },
            {
              path: "contacts/add",
              element: <AddContact />,
            },
            {
              path: "contacts/:id",
              element: <ContactDetails />,
            },
            {
              path: "contacts/:id/edit",
              element: <EditContact />,
            },

            // Pipeline
            {
              path: "pipeline",
              element: <Pipeline />,
            },
            {
              path: "pipeline/add",
              element: <AddDeal />,
            },
            {
              path: "pipeline/:id",
              element: <DealDetails />,
            },
            {
              path: "pipeline/:id/edit",
              element: <EditDeal />,
            },

            // Tasks
            {
              path: "tasks",
              element: <Tasks />,
            },
            {
              path: "tasks/add",
              element: <AddTask />,
            },
            {
              path: "tasks/:id",
              element: <TaskDetails />,
            },
            {
              path: "tasks/:id/edit",
              element: <EditTask />,
            },

            // Notes
            {
              path: "notes",
              element: <Notes />,
            },

            // Settings
            {
              path: "settings",
              element: <Settings />,
            },
          ],
        },
      ],
    },

    // =====================================
    // 404
    // =====================================

    {
      path: "*",
      element: <NotFound />,
    },
  ]);
};

export default AppRoutes;