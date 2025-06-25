import { Activity, AlertCircle, Clock, Download, Eye, FileText, Filter, Mail, Phone, Plus, Search, User, UserCheck, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import AssignNurseModal from "../components/AssignmentModal";

const PatientsManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const { nurses, patients, handleAssignNurse } = useAdmin()

    function getPhysicalConditionLabels(condition: number): string[] {
        const mapping: { [key: number]: string } = {
            0: "On Bed",
            2: "Can Walk",
            4: "Need Support to Walk",
            8: "Wheelchair User",
            16: "Partially Paralyzed",
            32: "Unconscious",
        };

        const labels = Object.entries(mapping)
            .filter(([flag]) => (condition & parseInt(flag)) !== 0)
            .map(([_, label]) => label);
            
        return labels.length > 0 ? labels : ["No specific conditions"];
    }

    // Helper function to get care type display name
    function getCareTypeDisplay(careType: string): string {
        const careTypeMap: { [key: string]: string } = {
            'ShortTerm': 'Short Term Care',
            'LongTerm': 'Long Term Care',
            'Emergency': 'Emergency Care',
            'Chronic': 'Chronic Care'
        };
        return careTypeMap[careType] || careType;
    }

    // Helper function to get service type display name
    function getServiceTypeDisplay(serviceType: string): string {
        const serviceTypeMap: { [key: string]: string } = {
            'PostOperativeCare': 'Post-Operative Care',
            'ChronicCare': 'Chronic Care',
            'RecoveryCare': 'Recovery Care',
            'PalliativeCare': 'Palliative Care'
        };
        return serviceTypeMap[serviceType] || serviceType;
    }

    const filteredPatients = patients.filter((patient: any) => {
        const matchesSearch = patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.careType.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === 'all') return matchesSearch;
        if (filterStatus === 'assigned') return matchesSearch && patient.homeNurseId;
        if (filterStatus === 'unassigned') return matchesSearch && !patient.homeNurseId && patient.isNeedNurse;

        return matchesSearch;
    });

    return (
        <div className="space-y-6 px-4 md:px-8 py-6">
            {/* Header Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search patients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            >
                                <option value="all">All Patients</option>
                                <option value="assigned">Assigned</option>
                                <option value="unassigned">Need Assignment</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all">
                            <Plus className="w-4 h-4" />
                            <span>Add Patient</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Patients Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPatients.map((patient: any) => (
                    <div key={patient.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-6">
                            {/* Patient Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        {patient.photoUrl ? (
                                            <img 
                                                src={patient.photoUrl} 
                                                alt={patient.fullName}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        ) : (
                                            <span className="text-white font-bold text-lg">
                                                {patient.fullName.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{patient.fullName}</h3>
                                        <p className="text-gray-500 text-sm">{patient.age} years • {patient.gender}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center space-x-3">
                                    <AlertCircle className="w-5 h-5 text-indigo-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Physical Condition</p>
                                        <p className="text-gray-700">
                                            {getPhysicalConditionLabels(patient.physicalCondition).join(', ')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Activity className="w-5 h-5 text-indigo-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Service Type</p>
                                        <p className="font-medium text-gray-900">
                                            {getServiceTypeDisplay(patient.serviceType)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-indigo-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Care Type</p>
                                        <p className="font-medium text-gray-900">
                                            {getCareTypeDisplay(patient.careType)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Clock className="w-5 h-5 text-indigo-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Registered</p>
                                        <p className="font-medium text-gray-900">
                                            {new Date(patient.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Assigned Nurse or Need Assignment */}
                            {patient.homeNurseId ? (
                                <div className="bg-green-50 rounded-xl p-4 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <UserCheck className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="text-sm text-green-800 font-medium">Assigned Nurse</p>
                                            <p className="text-green-700">
                                                {patient.homeNurse?.fullName || 
                                                 nurses.find((n: any) => n.id === patient.homeNurseId)?.fullName || 
                                                 'Nurse'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : patient.isNeedNurse ? (
                                <div className="bg-yellow-50 rounded-xl p-4 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                                        <div>
                                            <p className="text-sm text-yellow-800 font-medium">Needs Nurse</p>
                                            <p className="text-yellow-700">Patient requires nurse assignment</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-800 font-medium">No Nurse Needed</p>
                                            <p className="text-gray-700">Patient doesn't require nursing care</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Contact Info */}
                            <div className="space-y-2 mb-6">
                                {patient.relative?.phoneNumber && (
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Relative Contact</p>
                                            <p className="text-gray-700">{patient.relative.phoneNumber}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {patient.relative?.email && (
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Relative Email</p>
                                            <p className="text-gray-700">{patient.relative.email}</p>
                                        </div>
                                    </div>
                                )}

                                {patient.relative?.fullName && (
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-400">Emergency Contact</p>
                                            <p className="text-gray-700">{patient.relative.fullName}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {patient.payment > 0 && (
                                    <div className="flex items-center space-x-3">
                                        <span className="w-5 h-5 text-gray-500">💰</span>
                                        <div>
                                            <p className="text-xs text-gray-400">Payment</p>
                                            <p className="text-gray-700">${patient.payment}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex space-x-3">
                                <button
                                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                                    onClick={() => {
                                        // View patient details
                                        console.log('Viewing patient:', patient);
                                    }}
                                >
                                    <Eye className="w-4 h-4" />
                                    <span>View</span>
                                </button>

                                {patient.isNeedNurse && !patient.homeNurseId && (
                                    <button
                                        className="flex-1 py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
                                        onClick={() => {
                                            setSelectedPatient(patient.id);
                                            setShowAssignModal(true);
                                        }}
                                    >
                                        <UserPlus className="w-4 h-4" />
                                        <span>Assign</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {filteredPatients.length === 0 && (
                    <div className="col-span-full py-12 text-center">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Users className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No patients found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            {searchTerm
                                ? `No patients match your search for "${searchTerm}"`
                                : filterStatus === 'assigned'
                                    ? "You currently have no assigned patients"
                                    : filterStatus === 'unassigned'
                                        ? "All patients have been assigned a nurse"
                                        : "No patients available"}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilterStatus('all');
                                }}
                                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                )}
            </div>  
                <AssignNurseModal
              isOpen={showAssignModal}
              onClose={() => setShowAssignModal(false)}
              requestId={selectedPatient}
              nurses={nurses}
              onAssign={(reqId, nurseId) => {
                handleAssignNurse(reqId, nurseId);
              }}
            />          
        </div>
    );
};

export default PatientsManagement;