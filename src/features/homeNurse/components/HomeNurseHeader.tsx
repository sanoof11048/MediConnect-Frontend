import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface HeaderProps {
  currentPatient?: any;
}

const HomeNurseHeader: React.FC<HeaderProps> = ({ currentPatient }) => {
    const {user} = useAuth()
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1a98cd] to-[#3aba90] bg-clip-text text-transparent">
            {currentPatient ? `${currentPatient.fullName}` : 'Select a Patient'}
          </h2>
          {currentPatient && (
            <div className="flex items-center space-x-6 mt-2">
              <span className="text-gray-600 font-medium">{currentPatient.age} years old</span>
              <span className="text-gray-400">•</span>
              <span className="px-3 py-1 bg-[#1a98cd]/10 text-[#1a98cd] rounded-full text-sm font-medium">
                {currentPatient.careType}
              </span>
              <span className="px-3 py-1 bg-[#3aba90]/10 text-[#3aba90] rounded-full text-sm font-medium">
                {currentPatient.serviceType}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-3 rounded-xl hover:bg-gray-50 relative transition-all">
            <Bell className="h-5 w-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#3aba90] rounded-full border-2 border-white"></div>
          </button>
          <div className="flex items-center space-x-3 bg-gradient-to-r from-[#1a98cd]/5 to-[#3aba90]/5 rounded-xl p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1a98cd] to-[#3aba90] rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user?.fullName}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeNurseHeader;