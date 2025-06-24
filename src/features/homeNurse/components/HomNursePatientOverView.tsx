import React from 'react';
import { Shield, TrendingUp, Zap } from 'lucide-react';

interface PatientOverviewProps {
  patient: any;
}

const HomeNursePatientOverview: React.FC<PatientOverviewProps> = ({ patient }) => {
  if (!patient) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <p className="text-gray-600">
          {patient.medicalHistory || 'No medical history recorded'}
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Physical Condition</h3>
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            patient.physicalCondition === 'On Bed' ? 'bg-red-500' : 
            patient.physicalCondition === 'Need Support to Walk' ? 'bg-yellow-500' : 'bg-green-500'
          }`} />
          <span className="text-gray-900 font-medium">{patient.physicalCondition}</span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>Care Type</span>
            <span className="font-medium text-gray-900">{patient.careType}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Service Type</span>
            <span className="font-medium text-gray-900">{patient.serviceType}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
          <div className="p-2 bg-purple-100 rounded-lg">
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
        </div>
        <div className="flex items-end space-x-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">${patient.payment.toFixed(2)}</span>
          <span className="text-gray-500">/month</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Nurse Required</span>
          <span className={`font-medium ${
            patient.isNeedNurse ? 'text-green-600' : 'text-gray-500'
          }`}>
            {patient.isNeedNurse ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeNursePatientOverview;