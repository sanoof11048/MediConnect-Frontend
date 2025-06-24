import React, { useEffect, useState } from 'react';
import { Eye, ToggleLeft, ToggleRight, User, Phone, Mail, Calendar, Users, MapPin } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';

interface Patient {
  id: string;
  fullName: string;
  age: number;
  dob: string;
  gender: string;
  photoUrl: string;
  careType: string;
  serviceType: string;
  physicalCondition: string;
  physicalConditionDisplay: string[];
  medicalHistory: string;
  payment: number;
  isNeedNurse: boolean;
  relativeId: string;
  relativeName: string;
  nurseId: string;
  nurseName: string;
  createdAt: string;
  updatedAt: string;
}

interface Relative {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  photoUrl: string;
  address: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  patientsAsRelative: Patient[];
  patientsAsHomeNurse: Patient[];
}

const AdminRelativesPage: React.FC = () => {
  const { relatives,  handleBlockUser } = useAdmin()
  const [selectedRelative, setSelectedRelative] = useState<Relative | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [optimisticRelatives, setOptimisticRelatives] = useState<Relative[] | null>(relatives);

  useEffect(() => {
    setOptimisticRelatives(relatives);
  }, [relatives]);

  const toggleActiveStatus = (relativeId: string) => {
    setOptimisticRelatives((prev: any) =>
      prev.map((r: any) =>
        r.id === relativeId ? { ...r, isActive: !r.isActive } : r
      )
    );
    // fetchRelatives();
    handleBlockUser(relativeId);
  };

  const viewDetails = (relative: Relative) => {
    setSelectedRelative(relative);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedRelative(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCareType = (careType: string) => {
    return careType.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Relatives Management</h1>
              <p className="text-gray-600 mt-2">Manage relatives and view their patient details</p>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-blue-700 font-semibold">{relatives.length} Total Relatives</span>
            </div>
          </div>
        </div>

        {/* Relatives Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Relative
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Patients
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {optimisticRelatives?.map((relative: any) => (
                  <tr key={relative.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={relative.photoUrl}
                          alt={relative.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeD0iOCIgeT0iOCI+CjxwYXRoIGQ9Ik0yMCAyMVYxOUE0IDQgMCAwIDAgMTYgMTVIOEE0IDQgMCAwIDAgNCAyN1YyMU0xNiA3QTQgNCAwIDEgMSA4IDdBNCA0IDAgMCAxIDE2IDdaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                          }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 capitalize">{relative.fullName}</h3>
                          <p className="text-sm text-gray-500">{relative.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {relative.email}
                        </div>
                        {relative.phoneNumber && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {relative.phoneNumber}
                          </div>
                        )}
                        {relative.address && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {relative.address}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-600">
                          {relative.patientsAsRelative.length} Patients
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleActiveStatus(relative.id)}
                          className="flex items-center space-x-1 transition-colors"
                        >
                          {relative.isActive ? (
                            <ToggleRight className="w-6 h-6 text-green-500" />
                          ) : (
                            <ToggleLeft className="w-6 h-6 text-gray-400" />
                          )}
                        </button>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${relative.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                          }`}>
                          {relative.isActive ? 'Active' : 'Blocked'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => viewDetails(relative)}
                        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedRelative && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeDetails}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedRelative.photoUrl}
                  alt={selectedRelative.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeD0iOCIgeT0iOCI+CjxwYXRoIGQ9Ik0yMCAyMVYxOUE0IDQgMCAwIDAgMTYgMTVIOEE0IDQgMCAwIDAgNCAyN1YyMU0xNiA3QTQgNCAwIDEgMSA4IDdBNCA0IDAgMCAxIDE2IDdaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">{selectedRelative.fullName}</h2>
                  <p className="text-gray-600">{selectedRelative.role}</p>
                </div>
              </div>
              <button
                onClick={closeDetails}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{selectedRelative.email}</span>
                  </div>
                  {selectedRelative.phoneNumber && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{selectedRelative.phoneNumber}</span>
                    </div>
                  )}
                  {selectedRelative.address && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{selectedRelative.address}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Joined: {formatDate(selectedRelative.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Patients Under Care */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Patients Under Care ({selectedRelative.patientsAsRelative.length})
                </h3>
                {selectedRelative.patientsAsRelative.length > 0 ? (
                  <div className="space-y-4">
                    {selectedRelative.patientsAsRelative.map((patient) => (
                      <div key={patient.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <img
                            src={patient.photoUrl}
                            alt={patient.fullName}
                            className="w-16 h-16 rounded-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeD0iOCIgeT0iOCI+CjxwYXRoIGQ9Ik0yMCAyMVYxOUE0IDQgMCAwIDAgMTYgMTVIOEE0IDQgMCAwIDAgNCAyN1YyMU0xNiA3QTQgNCAwIDEgMSA4IDdBNCA0IDAgMCAxIDE2IDdaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                            }}
                          />
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-900">{patient.fullName}</h4>
                              <span className="text-sm text-gray-500">{patient.age} years, {patient.gender}</span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Care Type:</span>
                                <span className="ml-2 text-gray-600">{formatCareType(patient.careType)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Service:</span>
                                <span className="ml-2 text-gray-600">{formatCareType(patient.serviceType)}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Condition:</span>
                                <span className="ml-2 text-gray-600">{patient.physicalConditionDisplay.join(', ')}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Assigned Nurse:</span>
                                <span className="ml-2 text-gray-600">{patient.nurseName}</span>
                              </div>
                            </div>

                            {patient.medicalHistory && patient.medicalHistory !== "Nothing" && (
                              <div className="text-sm">
                                <span className="font-medium text-gray-700">Medical History:</span>
                                <span className="ml-2 text-gray-600">{patient.medicalHistory}</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>Created: {formatDate(patient.createdAt)}</span>
                              <span>Updated: {formatDate(patient.updatedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No patients assigned to this relative</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRelativesPage;