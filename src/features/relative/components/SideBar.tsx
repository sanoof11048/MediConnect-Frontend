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
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

function SideBar({ isVisible, onClose }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();

    const sidebarItems = [
        { id: "overview", icon: TrendingUp, label: "Overview", color: "#1a98cd" },
        { id: "patients", icon: User, label: "Patients", color: "#1a98cd" },
        { id: "nurses", icon: Stethoscope, label: "Care Team", color: "#3aba90" },
        { id: "payments", icon: DollarSign, label: "Finance", color: "#3aba90" },
        { id: "schedule", icon: Calendar, label: "Schedule", color: "#1a98cd" },
        { id: "reports", icon: Activity, label: "Reports", color: "#3aba90" },
    ];

    return (
       <div
  onMouseEnter={() => setSidebarOpen(true)}
  onMouseLeave={() => setSidebarOpen(false)}
  className={`
    ${sidebarOpen ? "md:w-72" : "md:w-20"}
    fixed md:relative z-50
    top-0 left-0
    h-screen
    bg-white shadow-2xl transition-all duration-300 flex flex-col border-r border-gray-100
    ${isVisible ? "left-0" : "-left-full"} md:left-0
    overflow-y-auto
    w-72
  `}
>


            {/* Mobile Close Button */}
            <div className="md:hidden p-4 flex justify-end z-50">
                <button onClick={onClose}>
                    <X size={24} className="text-gray-600" />
                </button>
            </div>

            {/* Logo/Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "#1a98cd" }}
                    >
                        <Shield className="text-white" size={20} />
                    </div>
                    {sidebarOpen && (
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
                        onClick={() => {
                            navigate(item.label.toLocaleLowerCase().replace(/\s+/g, "-"));
                            setActiveTab(item.id);
                            onClose(); // close sidebar on mobile after click
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${activeTab === item.id
                                ? "text-white shadow-lg transform scale-105"
                                : "text-gray-600 hover:bg-gray-50"
                            }`}
                        style={activeTab === item.id ? { backgroundColor: item.color } : {}}
                    >
                        <item.icon size={20} />
                        {sidebarOpen && <span className="font-medium">{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Collapse Button Hidden (hover handles it) */}
            <div className="p-4 border-t border-gray-100 hidden md:block"></div>
        </div>
    );
}


export default SideBar;
