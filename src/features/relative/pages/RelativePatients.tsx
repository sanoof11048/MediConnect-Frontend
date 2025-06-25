import { Plus, Heart, Activity, Users, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useRelative } from '../../../context/RelativeContext';
import { useNavigate } from 'react-router-dom';
import AddPatientModal from '../modals/AddPatientModal';

function RelativePatients() {
    const [showAddPatient, setShowAddPatient] = useState(false);
    const navigate = useNavigate()



    const { patients } = useRelative()
    const stats = [
        { label: "Total Patients", value: patients.length, change: "+1 this month", icon: Users, color: "bg-[#1a98cd]" },
        // { label: "Active Cases", value: , change: "+2 this week", icon: Activity, color: "bg-[#3aba90]" },
        // { label: "Critical", value: "3", change: "-1 this week", icon: Heart, color: "bg-red-500" },
        { label: "Recovery Rate", value: "94%", change: "+2% this month", icon: TrendingUp, color: "bg-gradient-to-r from-[#1a98cd] to-[#3aba90]" }
    ];

    const getRiskColor = (level: any) => {
        switch (level) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusColor = (status: any) => {
        switch (status) {
            case 'critical': return 'bg-red-500';
            case 'monitoring': return 'bg-yellow-500';
            case 'stable': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="min-h-screen px-4 md:px-8 py-6 bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 p-6">
            {/* Floating Header */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-2xl flex items-center justify-center shadow-lg">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                Patient Care Hub
                            </h1>
                            <p className="text-gray-600 text-lg">Advanced health monitoring & management</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200">
                            <Bell className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-200">
                            <Settings className="w-5 h-5 text-gray-600" />
                        </button> */}
                        <button
                            onClick={() => setShowAddPatient(true)}
                            className="px-8 py-4 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-200 flex items-center gap-3"
                        >
                            <Plus size={20} />
                            Add Patient
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                                <div className="text-sm text-green-600 font-medium">{stat.change}</div>
                            </div>
                        </div>
                        <div className="text-gray-600 font-medium">{stat.label}</div>
                    </div>
                ))}
            </div>
            {/* Patient Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {patients.map((patient) => (
                    <div key={patient.id} className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.01]">
                        {/* Card Header */}
                        <div className="relative p-6 bg-gradient-to-r from-[#1a98cd] to-[#3aba90]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden">
                                        <img
                                            src={patient.photoUrl}
                                            alt="Patient"
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-white">{patient.fullName}</h3>
                                        <p className="text-cyan-100">Age {patient.age}</p>
                                    </div>
                                </div>
                                <div className={`w-4 h-4 ${getStatusColor(patient.status)} rounded-full shadow-lg`}></div>
                            </div>

                            {/* Risk Level Badge */}
                            <div className="absolute top-4 right-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(patient.riskLevel)}`}>
                                    {patient.serviceType}
                                </span>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Primary Condition</h4>
                                <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{patient.physicalCondition}</p>
                            </div>

                            {/* Vital Signs */}
                            <div>
                                <h4 className="font-semibold text-gray-800 mb-3">Latest Vitals</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-red-50 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <Heart className="w-4 h-4 text-[#1a98cd]" />
                                            <span className="text-xs text-[#1a98cd] font-medium">Heart Rate</span>
                                        </div>
                                        <div className="text-lg font-bold text-gray-700">{patient.vitals.heartRate} BPM</div>
                                    </div>
                                    <div className="bg-teal-50 rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-[#3aba90]" />
                                            <span className="text-xs text-[#3aba90] font-medium">Blood Pressure</span>
                                        </div>
                                        <div className="text-lg font-bold text-gray-700">{patient.vitals.bloodPressure}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Info */}
                            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-[#3aba90]" />
                                    <span className="text-sm font-semibold text-teal-800">Last Details Updated</span>
                                </div>
                                <p className="text-teal-700 font-medium">{new Date(patient.updatedAt).toLocaleString()}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-xl font-medium hover:from-[#1585b0] hover:to-[#32a67d] transition-all duration-200">
                                    View Details
                                </button>


                                {patient.isNeedNurse && (
                                    <button
                                        onClick={() => navigate(`/relative/request-nurse/${patient.id}`)}
                                        className="px-4 py-3 bg-white border border-[#3aba90] text-[#3aba90] rounded-xl hover:bg-[#3aba90] hover:text-white transition-colors duration-200 font-semibold"
                                    >
                                        Request Nurse
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {patients.length === 0 && (
                <div className="text-center py-20">
                    <div className="w-32 h-32 bg-gradient-to-r from-cyan-100 to-teal-100 rounded-full mx-auto mb-8 flex items-center justify-center">
                        <Users className="w-16 h-16 text-[#1a98cd]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">No Patients Yet</h3>
                    <p className="text-gray-600 mb-8">Start managing patient care by adding your first patient</p>
                    <button
                        onClick={() => setShowAddPatient(true)}
                        className="px-8 py-4 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-200"
                    >
                        <Plus className="w-5 h-5 inline mr-2" />
                        Add Your First Patient
                    </button>
                </div>
            )}

            <AddPatientModal
                isOpen={showAddPatient}
                onClose={() => setShowAddPatient(false)}
            />
        </div>
    );
}

export default RelativePatients;