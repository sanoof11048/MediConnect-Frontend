import {
  Activity,
  Calendar,
  DollarSign,
  Shield,
  Stethoscope,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  activeTab: string;
}

function SideBar({ isVisible, onClose, activeTab }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    { id: "overview", icon: TrendingUp, label: "Overview", color: "#1a98cd", path: "overview" },
    { id: "patients", icon: User, label: "Patients", color: "#1a98cd", path: "patients" },
    { id: "nurses", icon: Stethoscope, label: "Care Team", color: "#3aba90", path: "nurses" },
    { id: "payments", icon: DollarSign, label: "Finance", color: "#3aba90", path: "payments" },
    { id: "plans", icon: Calendar, label: "Plans", color: "#1a98cd", path: "plans" },
    { id: "reports", icon: Activity, label: "Reports", color: "#3aba90", path: "reports" },
  ];

  const handleNavigation = (item: any) => {
    navigate(item.path);
    if (isMobile) onClose(); // Only close on mobile
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        fixed md:relative z-[500] top-0 left-0 h-full
        bg-white shadow-2xl transition-all duration-100 ease-in-out flex flex-col border-r border-gray-100 overflow-y-auto
        ${isVisible || !isMobile ? "translate-x-0" : "-translate-x-full"}
        ${isMobile ? "w-72" : isHovered ? "md:w-72" : "md:w-20"} 
        transform md:translate-x-0
      `}
    >
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="absolute top-4 right-4 z-50 md:hidden">
          <button onClick={onClose}>
            <X size={28} className="text-gray-700 bg-white rounded-full shadow p-1" />
          </button>
        </div>
      )}

      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex min-h-12 items-center space-x-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#1a98cd" }}
          >
            <Shield className="text-white" size={20} />
          </div>
          {(isHovered || isMobile) && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">MediConnect</h1>
              <p className="text-sm text-gray-500">Relative Dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`w-full flex items-center text-nowrap whitespace-nowrap space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === item.id
                ? "text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={activeTab === item.id ? { backgroundColor: item.color } : {}}
          >
            <item.icon size={16} />
            {(isHovered || isMobile) && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default SideBar;
