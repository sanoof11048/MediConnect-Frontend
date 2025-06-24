import { NavLink } from "react-router-dom";
import {
  AccessibilityIcon,
  Calendar,
  ChevronDown,
  Heart,
  Home,
  Settings,
  Stethoscope,
  TrendingUp,
  User,
  Users,
  X,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";

interface SidebarAdminProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarAdmin = ({ isOpen, setIsOpen }: SidebarAdminProps) => {
  const menuItems = [
    { path: "/admin", icon: Home, label: "Dashboard", exact: true },
    { path: "/admin/patients", icon: AccessibilityIcon, label: "Patients" },
    { path: "/admin/nurses", icon: Stethoscope, label: "Nurses" },
    { path: "/admin/requests", icon: Users, label: "Requests" },
    { path: "/admin/assignments", icon: Calendar, label: "Assignments" },
    { path: "/admin/relatives", icon: User, label: "Relatives" },
    { path: "/admin/analytics", icon: TrendingUp, label: "Analytics" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile overlay with backdrop blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 
          bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
          text-white shadow-2xl
          transition-all duration-300 ease-in-out
          min-h-screen w-72 lg:w-20 hover:lg:w-72
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 group
          border-r border-slate-700/50
        `}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-emerald-600/10 pointer-events-none" />
        
        {/* Scrollable content */}
        <div className="relative flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600">
          
          {/* Header Section */}
          <div className={`border-b border-slate-700/50 p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Logo with glow effect */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl blur-xl opacity-30 -z-10" />
                </div>
                
                {/* Brand text with animation */}
                <div className="md:hidden lg:group-hover:block animate-fade-in">

                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    MediConnect
                  </h1>
                  <p className="text-sm text-slate-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Admin Portal
                  </p>
                </div>
              </div>
              
              {/* Close button with hover effect */}
              <button 
                className="lg:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors duration-200" 
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Stats (visible on hover) */}
          <div className="hidden lg:group-hover:block px-6 py-4 border-b border-slate-700/30">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-400">24</div>
                <div className="text-xs text-slate-400">Active</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center flex items-center justify-center">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span className="ml-1 text-sm font-medium">3</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `group/item flex items-center p-3 rounded-xl transition-all duration-300 relative overflow-hidden
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-600/20 to-emerald-600/20 text-white shadow-lg border border-blue-500/30" 
                    : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                  }`
                }
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Active indicator */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-emerald-500 transform scale-y-0 group-[.active]/item:scale-y-100 transition-transform duration-300" />
                
                {/* Icon with hover effect */}
                <div className="relative">
                  <item.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110" />
                </div>
                
                {/* Label with slide animation */}
                <span className="ml-4 font-medium md:hidden lg:group-hover:inline transition-all duration-300 transform">
                  {item.label}
                </span>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl" />
              </NavLink>
            ))}
          </nav>

          {/* Admin Profile Section */}
          <div className="p-0 border-t border-slate-700/50">
            <div className="group/profile flex items-center gap-3 bg-slate-800/50 p-4 rounded-2xl hover:bg-slate-700/50 transition-all duration-300 cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold">AD</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800 animate-pulse" />
              </div>
              
              <div className="hidden lg:group-hover:block flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-slate-400 truncate">admin@mediconnect.com</p>
              </div>
              
              <ChevronDown className="w-4 h-4 hidden lg:group-hover:block text-slate-400 group-hover/profile:text-white transition-all duration-300 group-hover/profile:rotate-180" />
            </div>
            
            <button className="hidden lg:group-hover:flex w-full mt-3 items-center gap-3 p-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300">
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;