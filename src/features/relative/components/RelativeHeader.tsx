import { Bell, Search, User, Menu } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onMenuClick: () => void; // Pass toggle handler
}

export default function RelativeHeader({ activeTab, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-4 md:px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu: Only show on mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={onMenuClick}>
            <Menu size={24} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 capitalize">
              {activeTab.replace('-', ' ')}
            </h2>
            <p className="text-gray-600">Welcome back! Here's what's happening with your family's care.</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 rounded-2xl hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-gray-200" style={{ backgroundColor: '#1a98cd' }}>
            <User className="text-white p-2" size={40} />
          </div>
        </div>
      </div>
    </header>
  );
}
