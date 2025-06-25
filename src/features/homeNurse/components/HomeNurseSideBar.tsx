import React from 'react';
import { Search, User, Heart, Menu } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  patients: any[];
  selectedPatient: string;
  onPatientSelect: (id: string) => void;
}


const HomeNurseSidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  searchTerm = '',
  onSearchChange = () => {},
  patients = [],
  selectedPatient = '',
  onPatientSelect = () => {}
}) => {
    const formatLabel = (text: string) => {
  return text.replace(/([a-z])([A-Z])/g, '$1 $2');
};

  return (
    <div className={`bg-gradient-to-b from-[#1a98cd] via-[#1a98cd] to-[#1580b5] text-white transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-80'
    } min-h-screen flex flex-col shadow-2xl relative`}>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-20 left-0 w-24 h-24 bg-[#3aba90] opacity-20 rounded-full -translate-x-12"></div>
      
      <div className={`border-b border-white/20 relative z-10 ${collapsed ? 'p-3' : 'p-6'}`}>
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-3 shadow-lg">
            <Heart className="h-7 w-7 text-[#1a98cd]" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-xl text-white">MediConnect</h1>
              <p className="text-cyan-100 text-sm font-medium">Home Nurse Portal</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 py-6 relative z-10">
        <div className="px-6 mb-6">
          {!collapsed && (
            <div className="relative">
              <Search className="absolute left-4 top-4 h-4 w-4 text-cyan-200" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-cyan-200 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all"
              />
            </div>
          )}
        </div>

            <div className={`space-y-3 ${collapsed ? "px-0": "px-2"}`}>
          {patients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => onPatientSelect(patient.id)}
              className={`group flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedPatient === patient.id 
                  ? 'bg-white/20 border border-white/30 shadow-lg backdrop-blur-sm' 
                  : 'hover:bg-white/10 hover:backdrop-blur-sm'
              }`}
            >
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  selectedPatient === patient.id 
                    ? 'bg-[#3aba90] shadow-lg' 
                    : 'bg-white/20 group-hover:bg-[#3aba90]/80'
                }`}>
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-start truncate">{patient.fullName}</p>
                  <p className="text-cyan-100 text-start text-sm truncate">{formatLabel(patient.serviceType)}</p>
                  <div className="flex items-center mt-2">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      patient.physicalCondition === 'On Bed' ? 'bg-red-400' : 
                      patient.physicalCondition === 'Need Support to Walk' ? 'bg-yellow-400' : 'bg-[#3aba90]'
                    }`} />
<span className="text-xs text-cyan-200 font-medium">
  {formatLabel(patient.physicalCondition)}
</span>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/20 p-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all text-cyan-100 hover:text-white"
        >
          <Menu className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Toggle Menu</span>}
        </button>
      </div>
    </div>
  );
};

export default HomeNurseSidebar;