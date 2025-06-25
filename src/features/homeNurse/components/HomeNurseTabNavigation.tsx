import React from 'react';
import { Activity, Pill, UtensilsCrossed } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: 'vitals' | 'medications' | 'meals') => void;
  vitalsCount: number;
  medicationsCount: number;
  mealsCount: number;
}

const HomeNurseTabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  vitalsCount,
  medicationsCount,
  mealsCount,
}) => {
  const tabs: {
  id: 'vitals' | 'medications' | 'meals';
  label: string;
  icon: React.ElementType;
  count: number;
  color: string;
}[] = [
  { id: 'vitals', label: 'Patient Vitals', icon: Activity, count: vitalsCount, color: 'text-red-500' },
  { id: 'medications', label: 'Medications', icon: Pill, count: medicationsCount, color: 'text-blue-500' },
  { id: 'meals', label: 'Food Log', icon: UtensilsCrossed, count: mealsCount, color: 'text-green-500' },
];


  return (
    <div className="bg-white border-b border-gray-100 px-8">
      <div className="flex space-x-1">
        {tabs.map(({ id, label, icon: Icon, count, color }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-3 py-4 px-6 font-medium text-sm transition-all rounded-t-xl ${
              activeTab === id
                ? 'bg-gradient-to-r from-[#1a98cd]/10 to-[#3aba90]/10 text-[#1a98cd] border-b-2 border-[#1a98cd]'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className={`h-4 w-4 ${activeTab === id ? 'text-[#1a98cd]' : color}`} />
            <span>{label}</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                activeTab === id
                  ? 'bg-[#1a98cd] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeNurseTabNavigation;
