import { useEffect, useState } from "react";
import {
    Search,
    Filter,
    Calendar,
    Clock,
    User,
    MapPin,
    Phone,
    Star,
    Award,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye,
    MoreVertical,
    Mail,
    HeartPulse,
    Stethoscope,
    Bed,
    ClipboardList,
    DollarSign,
    Home,
    List,
    ChevronDown,
    Plus,
    AlertTriangle,
    Grid3x3,
} from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import Loading from "../../../pages/Loading";

const AdminNurseRequestsPage = () => {
    const [filteredRequests, setFilteredRequests] = useState<any[]>([]);
    const [selectedNurseMap, setSelectedNurseMap] = useState<{ [requestId: string]: string }>({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("pending");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedRequest, setSelectedRequest] = useState<any>(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [currentRequestId, setCurrentRequestId] = useState<string>("");
    const { nurses, requests, adminLoading, handleAssignNurse } = useAdmin();

    useEffect(() => {
        if (showAssignModal && nurses.length === 1 && currentRequestId) {
            setSelectedNurseMap((prev) => ({
                ...prev,
                [currentRequestId]: nurses[0].id,
            }));
        }
    }, [showAssignModal, nurses, currentRequestId]);


    useEffect(() => {
        let filtered = [...requests];
        if (searchTerm) {
            filtered = filtered.filter(req =>
                req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.requirements?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (statusFilter !== "all") filtered = filtered.filter(req => (req.status?.toLowerCase() ?? "") === statusFilter);

        setFilteredRequests(filtered);
    }, [requests, searchTerm, statusFilter]);


    const handleSelectChange = (requestId: string, nurseId: string) => {
        setSelectedNurseMap((prev) => ({ ...prev, [requestId]: nurseId }));
    };

    const openAssignModal = (requestId: string) => {
        setCurrentRequestId(requestId);
        setShowAssignModal(true);
    };
    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case "pending": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case "approved": return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "assigned": return <CheckCircle className="w-4 h-4 text-blue-500" />;
            case "urgent": return <AlertCircle className="w-4 h-4 text-red-500" />;
            default: return <XCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const stats = {
        total: requests.length,
        pending: requests.filter(r => r.status === "Pending").length,
        approved: requests.filter(r => r.status === "Approved").length,
        urgent: requests.filter(r => r.priority === "Urgent").length,
        rejected: requests.filter(r => r.priority === "Rejected").length,
    };

    if ( adminLoading) return <Loading />;

    return (
        <div className="min-h-screen  px-4 md:px-8 py-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white/50 shadow-sm border-b sticky">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Nurse Request Management
                            </h1>
                            <p className="text-gray-600 mt-1">Manage and assign nursing requests efficiently</p>
                        </div>
                        <div className="flex items-center space-x-4">

                            <button
                                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-white shadow border border-gray-200 rounded-lg hover:bg-gray-50"
                            >
                                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3x3 className="w-4 h-4" />} {viewMode === 'grid' ? 'List View' : 'Grid View'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">
                {/* Stats Cards */}


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: 'Total Requests', value: stats.total, icon: User, color: 'blue' },
                        { label: 'Pending', value: stats.pending, icon: Clock, color: 'amber' },
                        { label: 'Approved', value: stats.approved, icon: CheckCircle, color: 'green' },
                    ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className="bg-white rounded-xl shadow p-5 flex items-center">
                            <div className={`p-3 bg-${color}-100 rounded-full`}>
                                <Icon className={`w-6 h-6 text-${color}-600`} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">{label}</p>
                                <p className="text-xl font-semibold text-gray-900">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters */}

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100/50">
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: "all", label: "All Requests", icon: <List className="w-4 h-4" />, activeBg: "bg-gradient-to-r from-indigo-500 to-purple-500", inactiveBg: "bg-gray-100", textColor: "text-white", },
                                { key: "pending", label: "Pending", icon: <Clock className="w-4 h-4" />, activeBg: "bg-gradient-to-r from-amber-400 to-amber-500", inactiveBg: "bg-gray-100", textColor: "text-white"},
                                { key: "approved", label: "Approved", icon: <CheckCircle className="w-4 h-4" />, activeBg: "bg-gradient-to-r from-emerald-400 to-emerald-500", inactiveBg: "bg-gray-100", textColor: "text-white", },
                                { key: "urgent", label: "Urgent", icon: <AlertTriangle className="w-4 h-4" />, activeBg: "bg-gradient-to-r from-red-400 to-red-500", inactiveBg: "bg-gray-100", textColor: "text-white", },
                                { key: "rejected", label: "Rejected", icon: <XCircle className="w-4 h-4" />, activeBg: "bg-gradient-to-r from-gray-400 to-gray-500", inactiveBg: "bg-gray-100", textColor: "text-white"},
                            ].map((btn) => (
                                <button
                                    key={btn.key}
                                    onClick={() => setStatusFilter(btn.key)}
                                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105
            ${statusFilter === btn.key
                                            ? `${btn.activeBg} ${btn.textColor} shadow-lg`
                                            : `${btn.inactiveBg} text-gray-700 hover:bg-gray-200`
                                        }`}
                                >
                                    <span className="mr-2">{btn.icon}</span>
                                    <span>{btn.label}</span>
                                    {statusFilter === btn.key && (
                                        <span className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-white bg-opacity-30">
                                            <span className="h-2 w-2 rounded-full bg-current"></span>
                                        </span>
                                    )}
                                </button>
                            ))}

                            <div className="relative w-full md:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search patients, doctors, or requirements..."
                                    className="w-full md:w-64 pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>




                {/* Requests Grid/List */}
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
                    {filteredRequests.map((request) => (
                        <div
                            key={request.id}
                            className={`bg-white rounded-2xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.01] ${viewMode === 'list' ? 'flex items-center space-x-6' : ''}`}
                        >                           <div className={viewMode === 'list' ? 'flex-1' : ''}>
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{request.patientName}</h3>
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <User className="w-4 h-4 mr-1" />
                                            Requested by: {request.requestedBy}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {getStatusIcon(request.status)}
                                        <button className="p-1 hover:bg-gray-100 rounded">
                                            <MoreVertical className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                                        {new Date(request.startDate).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                                        {request.durationDays} days
                                    </div>
                                    {request.location && (
                                        <div className="flex items-center text-gray-600 col-span-2">
                                            <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
                                            {request.location}
                                        </div>
                                    )}
                                </div>

                                {/* Care Type & Medical Info */}
                                <div className="mb-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                                        {formatCareType(request.careType)}
                                    </span>
                                    {request.patientAge && (
                                        <span className="ml-2 text-xs text-gray-500">Age: {request.patientAge}</span>
                                    )}
                                </div>

                                {/* Medical Condition */}
                                {request.medicalCondition && (
                                    <p className="text-sm text-gray-700 mb-2">
                                        <span className="font-medium">Condition:</span> {request.medicalCondition}
                                    </p>
                                )}

                                {/* Requirements */}
                                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                                    <span className="font-medium">Requirements:</span> {request.requirements}
                                </p>

                                {/* Budget */}
                                {request.budget && (
                                    <p className="text-sm font-medium text-green-600 mb-4">
                                        Budget: ${request.budget}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className={`space-y-2 ${viewMode === 'list' ? 'flex-shrink-0 w-64' : ''}`}>
                                <button
                                    onClick={() => setSelectedRequest(request)}
                                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                </button>
                                {request.status == 'Pending' && (
                                    <button
                                        onClick={() => openAssignModal(request.id)}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium"
                                    >
                                        Assign Nurse
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No requests found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/* Assignment Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Assign Nurse</h3>
                        <div className="grid gap-4">
                            {nurses.map((nurse) => (
                                <div
                                    key={nurse.homeNurseId}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedNurseMap[currentRequestId] === nurse.homeNurseId
                                        ? 'border-indigo-500 bg-indigo-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => handleSelectChange(currentRequestId, nurse.homeNurseId)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{nurse.userFullName}</h4>
                                            <p className="text-sm text-gray-600">{nurse.qualification}</p>
                                            <div className="flex items-center mt-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-600 ml-1">{nurse.rating} • {nurse.experienceYears} years exp</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${nurse.isAvailable
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {nurse.availableOn}
                                            </span>
                                            {nurse.userEmail && (
                                                <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                    <Mail className="w-3 h-3 mr-1" />
                                                    {nurse.userEmail}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log(selectedNurseMap[currentRequestId])
                                    handleAssignNurse(currentRequestId, selectedNurseMap[currentRequestId]);
                                    setShowAssignModal(false);
                                }}
                                disabled={!selectedNurseMap[currentRequestId]}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                            >
                                Assign Nurse
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Request Details Modal */}
            {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                                    <HeartPulse className="w-6 h-6 text-red-500 mr-2" />
                                    Request Details
                                </h3>

                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Patient Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                                    <User className="w-5 h-5 text-indigo-600 mr-2" />
                                    Patient Information
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Name</div>
                                        <div className="w-2/3">{selectedRequest.patientName}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Age</div>
                                        <div className="w-2/3">{selectedRequest.patientAge || 'Not specified'}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Condition</div>
                                        <div className="w-2/3">{selectedRequest.medicalCondition || 'Not specified'}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Care Type</div>
                                        <div className="w-2/3">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {formatCareType(selectedRequest.careType)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Request Details */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                                    <ClipboardList className="w-5 h-5 text-indigo-600 mr-2" />
                                    Request Details
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Requested By</div>
                                        <div className="w-2/3">{selectedRequest.requestedBy}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Start Date</div>
                                        <div className="w-2/3 flex items-center">
                                            <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                                            {new Date(selectedRequest.startDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Duration</div>
                                        <div className="w-2/3 flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-gray-500" />
                                            {selectedRequest.durationDays} days
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-1/3 font-medium text-gray-600">Location</div>
                                        <div className="w-2/3 flex items-center">
                                            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                                            {selectedRequest.location || 'Not specified'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                                    <Stethoscope className="w-5 h-5 text-indigo-600 mr-2" />
                                    Care Requirements
                                </h4>
                                <p className="text-gray-700 whitespace-pre-line">
                                    {selectedRequest.requirements || 'No specific requirements provided'}
                                </p>
                            </div>

                            {/* Additional Information */}
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                                        <DollarSign className="w-5 h-5 text-indigo-600 mr-2" />
                                        Budget Information
                                    </h4>
                                    <div className="text-xl font-bold text-green-600">
                                        ${selectedRequest.budget || 'Not specified'}
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                                        <Home className="w-5 h-5 text-indigo-600 mr-2" />
                                        Accommodation
                                    </h4>
                                    <p className="text-gray-700">
                                        {selectedRequest.accommodationDetails || 'No accommodation details provided'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Close
                            </button>
                            {selectedRequest.status === 'Pending' && (
                                <button
                                    onClick={() => {
                                        setSelectedRequest(null);
                                        openAssignModal(selectedRequest.id);
                                    }}
                                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Assign Nurse
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
           
        </div>
    );
};

const formatCareType = (careType: string) => {
    return careType.replace(/([A-Z])/g, " $1").trim();
};

export default AdminNurseRequestsPage;