import { TrendingUp } from "lucide-react";

  const StatCard = ({ title, value, icon: Icon, trend, color }:any) => (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10" style={{ backgroundColor: color }}></div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} className="mr-1" />
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className="p-4 rounded-2xl" style={{ backgroundColor: `${color}20` }}>
          <Icon size={32} style={{ color }} />
        </div>
      </div>
    </div>
  );
  export default StatCard