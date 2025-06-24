import {
  Bell,
  Search,
  User,
  Menu,
  ChevronDown,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

function RelativeHeader({ activeTab = "dashboard", onMenuClick = () => { } }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const formatTabName = (tab: string) =>
    tab.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const profileMenuItems = [
    { icon: User, label: "My Profile", action: () => { } },
    { icon: Settings, label: "Settings", action: () => { } },
    { icon: LogOut, label: "Sign Out", action: () => logout() },
  ];

  return (
    <header className="relative z-[300] ">
      {/* Main Header */}
      <div className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-white/30 px-4 md:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            {/* Mobile Menu */}
            <button
              className="md:hidden p-3 rounded-2xl hover:bg-gradient-to-r hover:from-[#1a98cd]/10 hover:to-[#3aba90]/10 transition"
              onClick={onMenuClick}
            >
              <Menu size={24} className="text-gray-700" />
            </button>

            {/* Logo and Page Info */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex w-12 h-12 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-2xl items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {formatTabName(activeTab)}
                  </h1>
                  <div className="hidden md:block px-3 py-1 bg-gradient-to-r from-[#1a98cd]/10 to-[#3aba90]/10 rounded-full">
                    <span className="text-sm font-medium text-[#1a98cd]">
                      Active
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  {getGreeting()}! Here's your family care overview
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 z-0">
            {/* Mobile Search */}
            <button className="sm:hidden p-3 rounded-2xl hover:bg-gray-100 transition">
              <Search size={20} className="text-gray-600" />
            </button>

            {/* Notification */}
            <div className="relative">
              <button className="p-3 rounded-2xl hover:bg-gradient-to-r hover:from-[#1a98cd]/10 hover:to-[#3aba90]/10 transition relative group">
                <Bell
                  size={20}
                  className="text-gray-600 group-hover:text-[#1a98cd] transition"
                />
                {/* Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                {/* Ping */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-75" />
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative z-40">
              <button
                className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gradient-to-r hover:from-[#1a98cd]/10 hover:to-[#3aba90]/10 transition group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#1a98cd] to-[#3aba90] flex items-center justify-center shadow-lg">
                    <User className="text-white" size={20} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.fullName}
                  </p>
                  <p className="text-xs text-gray-500">Family Caregiver</p>
                </div>
                <ChevronDown
                  className={`hidden md:block w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 py-2 z-[500]">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#1a98cd] to-[#3aba90] flex items-center justify-center">
                        <User className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user?.fullName}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Dropdown Items */}
                  <div className="py-2">
                    {profileMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gradient-to-r hover:from-[#1a98cd]/10 hover:to-[#3aba90]/10 transition group"
                      >
                        <item.icon className="w-5 h-5 text-gray-500 group-hover:text-[#1a98cd]" />
                        <span className="text-gray-700 group-hover:text-gray-900">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient (Behind Everything) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] opacity-60 z-10" />

    </header>
  );
}

export default RelativeHeader;
