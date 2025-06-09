import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../features/relative/components/SideBar";
import RelativeHeader from "../features/relative/components/RelativeHeader"; // adjust path

const RelativeLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();

  const activeTab = location.pathname.split("/")[2] || "overview";

  return (
  <div className="flex h-screen relative">
  <SideBar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />

  <div className="flex flex-col flex-1 overflow-y-auto ml-0 md:ml-20">
    <RelativeHeader activeTab={activeTab} onMenuClick={() => setSidebarVisible(true)} />
    <main className="flex-1 px-4 md:px-8 py-6">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default RelativeLayout;
