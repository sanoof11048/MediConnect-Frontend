import { X, Mail, Star } from "lucide-react";
import { useState, useEffect } from "react";

const AssignNurseModal = ({
  isOpen,
  onClose,
  requestId,
  nurses,
  onAssign,
  defaultSelected = null
}: {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  nurses: any[];
  onAssign: (requestId: string, nurseId: string) => void;
  defaultSelected?: string | null;
}) => {
  const [selectedNurseId, setSelectedNurseId] = useState<string | null>(defaultSelected);

  useEffect(() => {
    if (isOpen) {
      setSelectedNurseId(defaultSelected || null);
    }
  }, [isOpen, defaultSelected]);

  if (!isOpen) return null;

  const handleAssign = () => {
    if (selectedNurseId) {
      onAssign(requestId, selectedNurseId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Assign Nurse</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid gap-4">
          {nurses.map((nurse) => (
            <div
              key={nurse.homeNurseId}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedNurseId === nurse.homeNurseId
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedNurseId(nurse.homeNurseId)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{nurse.userFullName}</h4>
                  <p className="text-sm text-gray-600">{nurse.qualification}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">
                      {nurse.rating} • {nurse.experienceYears} years exp
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      nurse.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
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
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedNurseId}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            Assign Nurse
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignNurseModal;
