import { useState } from "react";
import { Outlet } from "react-router";

import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <ScrollToTop />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-col lg:ml-64">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;