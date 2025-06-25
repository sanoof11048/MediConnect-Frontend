import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SidebarAdmin from "../features/admin/components/SideBarAdmin";
import HeaderAdmin from "../features/admin/components/HeaderAdmin";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Prevent body scroll when mobile sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent layout shift
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      <SidebarAdmin isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main content area with proper spacing for sidebar */}
      <div className="flex-1 flex flex-col lg:ml-20 transition-all duration-300">
        <HeaderAdmin setIsOpen={setIsSidebarOpen} />
        
        {/* Main content with enhanced styling */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {/* Content wrapper with subtle shadow and rounded corners */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 min-h-[calc(100vh-8rem)] p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;