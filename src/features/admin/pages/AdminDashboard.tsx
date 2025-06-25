import { Activity, AlertCircle, CheckCircle, DollarSign, User, UserCheck, Users } from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";

const AdminDashboard = () => {
  const {nurses, patients} = useAdmin()
  const stats = {
    totalNurses: nurses.length,
    availableNurses: nurses.filter((n:any) => n.isAvailable).length,
    totalPatients: patients.length,
    assignedPatients: patients.filter((p:any) => p.homeNurseId).length,
    patientsNeedingNurse: patients.filter((p:any) => p.isNeedNurse && !p.homeNurseId).length,
    totalRevenue: patients.reduce((sum:any, p:any) => sum + p.payment, 0),
    avgRating: nurses.reduce((sum:any, n:any) => sum + n.rating, 0) / nurses.length
  };

  const recentActivities = [
    { type: 'assignment', message: 'Sarah Johnson assigned to Robert Williams', time: '2 hours ago', icon: UserCheck, color: 'text-green-600 bg-green-100' },
    { type: 'new_patient', message: 'New patient Maria Garcia registered', time: '4 hours ago', icon: User, color: 'text-blue-600 bg-blue-100' },
    { type: 'completed', message: 'Care assignment completed successfully', time: '1 day ago', icon: CheckCircle, color: 'text-purple-600 bg-purple-100' },
    { type: 'urgent', message: 'Urgent care needed for patient ID #4521', time: '2 days ago', icon: AlertCircle, color: 'text-red-600 bg-red-100' }
  ];

  return (
    <div className="space-y-6  px-4 md:px-8 py-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-white/80" />
              <span className="text-white/60 text-sm font-medium">Total</span>
            </div>
            <p className="text-3xl font-bold mb-1">{stats.totalNurses}</p>
            <p className="text-white/80 text-sm">Registered Nurses</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <UserCheck className="w-8 h-8 text-white/80" />
              <span className="text-white/60 text-sm font-medium">Available</span>
            </div>
            <p className="text-3xl font-bold mb-1">{stats.availableNurses}</p>
            <p className="text-white/80 text-sm">Ready for Assignment</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-white/80" />
              <span className="text-white/60 text-sm font-medium">Patients</span>
            </div>
            <p className="text-3xl font-bold mb-1">{stats.totalPatients}</p>
            <p className="text-white/80 text-sm">Under Care</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-white/80" />
              <span className="text-white/60 text-sm font-medium">Revenue</span>
            </div>
            <p className="text-3xl font-bold mb-1">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-white/80 text-sm">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.message}</p>
                  <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Assignments Today</span>
                <span className="font-bold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending Approvals</span>
                <span className="font-bold text-red-600">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Rating</span>
                <span className="font-bold text-green-600">{stats.avgRating.toFixed(1)}★</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Sessions</span>
                <span className="font-bold text-blue-600">{stats.assignedPatients}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Need Attention</h3>
            <p className="text-gray-600 mb-4">{stats.patientsNeedingNurse} patients are waiting for nurse assignment</p>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium">
              Assign Nurses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard