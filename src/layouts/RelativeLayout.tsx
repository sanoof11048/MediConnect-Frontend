import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../features/relative/components/SideBar";
import RelativeHeader from "../features/relative/components/RelativeHeader";

const RelativeLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const activeTab = location.pathname.split("/")[2] || "overview";

  return (
   <div className="flex h-screen relative">
  {sidebarVisible && (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-30 z-[350] md:hidden"
      onClick={() => setSidebarVisible(false)}
    />
  )}

  {/* Sidebar */}
  <SideBar
    isVisible={sidebarVisible}
    onClose={() => setSidebarVisible(false)}
    activeTab={activeTab}
  />

  {/* Main Content */}
  <div className="flex flex-col flex-1 overflow-y-auto z-[100]">
    <RelativeHeader
      activeTab={activeTab}
      onMenuClick={() => setSidebarVisible(true)}
    />
    <main className="flex-1 ">
      <Outlet />
    </main>
  </div>
</div>

  );
};

export default RelativeLayout;
