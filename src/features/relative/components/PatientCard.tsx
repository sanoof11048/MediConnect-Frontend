import { MoreVertical, Stethoscope } from "lucide-react";

const PatientCard = ({ patient, onViewDetails }: any) => {
    // Get latest vital if exists
    const latestVital = patient.vitals.length > 0 ? patient.vitals[patient.vitals.length - 1] : null;

    // Assign status based on sample logic (or derive based on vitals/condition)
    const status = "Stable"; // or derive based on vitals/condition

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden ">
            <div
                className="absolute top-0 left-0 w-2 h-full"
                style={{
                    backgroundColor:
                        status === "Stable" ? "#3aba90" :
                            status === "Critical" ? "#ef4444" :
                                "#1a98cd"
                }}
            ></div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <img
                            src={patient.photoUrl}
                            alt={patient.fullName}
                            className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{patient.fullName}</h3>
                            <p className="text-gray-600">Age {patient.age} • {patient.careType}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'Stable' ? 'bg-green-100 text-green-800' :
                                status === 'Critical' ? 'bg-red-100 text-red-800' :
                                    'bg-blue-100 text-blue-800'
                            }`}>
                            {status}
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <MoreVertical size={16} className="text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-2xl">
                        <p className="text-xs text-gray-500 mb-1">BP</p>
                        <p className="font-bold text-gray-800">
                            {latestVital?.bloodPressure ?? "--"}
                        </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-2xl">
                        <p className="text-xs text-gray-500 mb-1">Pulse</p>
                        <p className="font-bold text-gray-800">
                            {latestVital?.pulse ?? "--"}
                        </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-2xl">
                        <p className="text-xs text-gray-500 mb-1">Temp</p>
                        <p className="font-bold text-gray-800">
                            {latestVital?.temperature ?? "--"}°C
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <Stethoscope size={14} className="text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-600">
                            {patient.homeNurse?.fullName ?? "Not Assigned"}
                        </span>
                    </div>
                    <button
                        onClick={() => onViewDetails(patient)}
                        className="px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors hover:opacity-90"
                        style={{ backgroundColor: '#1a98cd' }}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientCard;