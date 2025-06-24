import { X } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";

const AssignmentModal = ({ isOpen, onClose, patient,  onAssign }:any) => {
  const [selectedNurse, setSelectedNurse] = useState('');
  const {nurses} = useAdmin()
  const availableNurses = nurses.filter((nurse:any) => nurse.isAvailable);
  

  const handleAssign = () => {
    if (selectedNurse && patient) {
      onAssign(patient.id, selectedNurse);
      setSelectedNurse('');
      onClose();
    }
  };

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Assign Nurse</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Patient: {patient.fullName}</h4>
          <p className="text-gray-600 text-sm">Condition: {patient.condition}</p>
          <p className="text-gray-600 text-sm">Care Type: {patient.careType}</p>
          <p className="text-gray-600 text-sm">Serive Type: {patient.serviceType}</p>
        
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Nurse
          </label>
          <select
            value={selectedNurse}
            onChange={(e) => setSelectedNurse(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Choose a nurse...</option>
            {availableNurses.map((nurse:any) => (
              <option key={nurse.homeNurseId} value={nurse.homeNurseId}>
                {nurse.userFullName} - {nurse.qualification} (★{nurse.rating})
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedNurse}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal