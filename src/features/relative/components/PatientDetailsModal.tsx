
import React from 'react';
import {  Stethoscope, X, Pill, Utensils, Activity, User,  Heart } from "lucide-react";

const PatientDetailsModal = ({ patient, isOpen, onClose }:any) => {
    if (!isOpen) return null;

    const formatDate = (dateString:string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getVitalStatus = (type:any, value:any) => {
        switch (type) {
            case 'bloodPressure':
                if (!value || value === '--') return { status: 'unknown', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
                const [systolic, diastolic] = value.split('/').map((v:any) => parseInt(v));
                if (systolic >= 180 || diastolic >= 120) return { status: 'Critical High', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', alert: true };
                if (systolic >= 140 || diastolic >= 90) return { status: 'High', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800', alert: true };
                if (systolic >= 130 || diastolic >= 80) return { status: 'Elevated', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', alert: true };
                if (systolic < 90 || diastolic < 60) return { status: 'Low', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', alert: true };
                return { status: 'Normal', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' };
                
            case 'pulse':
                if (!value || value === '--') return { status: 'unknown', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
                if (value > 100) return { status: 'High', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', alert: true };
                if (value > 90) return { status: 'Slightly High', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800', alert: true };
                if (value < 60) return { status: 'Low', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', alert: true };
                if (value < 70) return { status: 'Slightly Low', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', alert: true };
                return { status: 'Normal', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' };
                
            case 'temperature':
                if (!value || value === '--') return { status: 'unknown', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
                if (value >= 39) return { status: 'High Fever', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', alert: true };
                if (value >= 37.5) return { status: 'Fever', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800', alert: true };
                if (value >= 37.2) return { status: 'Slightly High', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', alert: true };
                if (value < 35) return { status: 'Low', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', alert: true };
                if (value < 36) return { status: 'Slightly Low', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', alert: true };
                return { status: 'Normal', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' };
                
            case 'bloodSugar':
                if (!value || value === '--') return { status: 'unknown', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
                if (value >= 200) return { status: 'Very High', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', alert: true };
                if (value >= 140) return { status: 'High', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800', alert: true };
                if (value >= 100) return { status: 'Slightly High', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', alert: true };
                if (value < 70) return { status: 'Low', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800', alert: true };
                return { status: 'Normal', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' };
                
            case 'oxygen':
                if (!value || value === '--' || value === 0) return { status: 'unknown', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
                if (value < 90) return { status: 'Critical Low', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800', alert: true };
                if (value < 95) return { status: 'Low', color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-800', alert: true };
                if (value < 98) return { status: 'Slightly Low', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', alert: true };
                return { status: 'Normal', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' };
                
            default:
                return { status: 'unknown', color: 'gray', bgColor: 'bg-gray-100', textColor: 'text-gray-800' };
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={patient.photoUrl}
                            alt={patient.fullName}
                            className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{patient.fullName}</h2>
                            <p className="text-gray-600">Age {patient.age} • {patient.gender} • {patient.careType}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-400" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
                    {/* Patient Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <User size={20} className="mr-2" />
                                Patient Information
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Date of Birth</p>
                                    <p className="font-medium text-gray-800">{new Date(patient.dob).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Gender</p>
                                    <p className="font-medium text-gray-800">{patient.gender}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Care Type</p>
                                    <p className="font-medium text-gray-800">{patient.careType}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Medical History</p>
                                    <p className="font-medium text-gray-800">{patient.medicalHistory || "No history recorded"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Stethoscope size={20} className="mr-2" />
                                Care Details
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Home Nurse</p>
                                    <p className="font-medium text-gray-800">{patient.homeNurse?.fullName || "Not Assigned"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Needs Nurse</p>
                                    <p className="font-medium text-gray-800">{patient.isNeedNurse ? "Yes" : "No"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment Status</p>
                                    <p className="font-medium text-gray-800">₹{patient.payment}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Registration Date</p>
                                    <p className="font-medium text-gray-800">{formatDate(patient.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Latest Vitals */}
                    {patient.vitals.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Activity size={20} className="mr-2" />
                                Latest Vitals
                            </h3>
                            
                            {/* Vital Alerts */}
                            {patient.vitals.slice(-1).map((vital:any) => {
                                const alerts = [];
                                const bpStatus = getVitalStatus('bloodPressure', vital.bloodPressure);
                                const pulseStatus = getVitalStatus('pulse', vital.pulse);
                                const tempStatus = getVitalStatus('temperature', vital.temperature);
                                const sugarStatus = getVitalStatus('bloodSugar', vital.bloodSugar);
                                const oxygenStatus = getVitalStatus('oxygen', vital.oxygen);
                                
                                if (bpStatus.alert) alerts.push({ type: 'Blood Pressure', status: bpStatus.status, color: bpStatus.color });
                                if (pulseStatus.alert) alerts.push({ type: 'Pulse', status: pulseStatus.status, color: pulseStatus.color });
                                if (tempStatus.alert) alerts.push({ type: 'Temperature', status: tempStatus.status, color: tempStatus.color });
                                if (sugarStatus.alert) alerts.push({ type: 'Blood Sugar', status: sugarStatus.status, color: sugarStatus.color });
                                if (oxygenStatus.alert) alerts.push({ type: 'Oxygen', status: oxygenStatus.status, color: oxygenStatus.color });
                                
                                return alerts.length > 0 && (
                                    <div key={vital.vitalId} className="mb-4 bg-red-50 border border-red-200 rounded-2xl p-4">
                                        <div className="flex items-center mb-2">
                                            <Heart size={16} className="text-red-500 mr-2" />
                                            <h4 className="font-semibold text-red-800">Vital Alerts</h4>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {alerts.map((alert, index) => (
                                                <div key={index} className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                                    alert.color === 'red' ? 'bg-red-100 text-red-800' :
                                                    alert.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                                                    alert.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {alert.type}: {alert.status}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {patient.vitals.slice(-1).map((vital:any) => {
                                    const bpStatus = getVitalStatus('bloodPressure', vital.bloodPressure);
                                    const pulseStatus = getVitalStatus('pulse', vital.pulse);
                                    const tempStatus = getVitalStatus('temperature', vital.temperature);
                                    const sugarStatus = getVitalStatus('bloodSugar', vital.bloodSugar);
                                    const oxygenStatus = getVitalStatus('oxygen', vital.oxygen);
                                    
                                    return (
                                        <React.Fragment key={vital.vitalId}>
                                            <div className={`border rounded-2xl p-4 text-center ${bpStatus.bgColor} border-${bpStatus.color}-200`}>
                                                <p className="text-xs text-gray-600 mb-1">Blood Pressure</p>
                                                <p className="font-bold text-lg text-gray-800">{vital.bloodPressure}</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${bpStatus.bgColor} ${bpStatus.textColor}`}>
                                                    {bpStatus.status}
                                                </span>
                                            </div>
                                            <div className={`border rounded-2xl p-4 text-center ${pulseStatus.bgColor} border-${pulseStatus.color}-200`}>
                                                <p className="text-xs text-gray-600 mb-1">Pulse</p>
                                                <p className="font-bold text-lg text-gray-800">{vital.pulse} bpm</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${pulseStatus.bgColor} ${pulseStatus.textColor}`}>
                                                    {pulseStatus.status}
                                                </span>
                                            </div>
                                            <div className={`border rounded-2xl p-4 text-center ${tempStatus.bgColor} border-${tempStatus.color}-200`}>
                                                <p className="text-xs text-gray-600 mb-1">Temperature</p>
                                                <p className="font-bold text-lg text-gray-800">{vital.temperature}°C</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${tempStatus.bgColor} ${tempStatus.textColor}`}>
                                                    {tempStatus.status}
                                                </span>
                                            </div>
                                            <div className={`border rounded-2xl p-4 text-center ${sugarStatus.bgColor} border-${sugarStatus.color}-200`}>
                                                <p className="text-xs text-gray-600 mb-1">Blood Sugar</p>
                                                <p className="font-bold text-lg text-gray-800">{vital.bloodSugar} mg/dL</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${sugarStatus.bgColor} ${sugarStatus.textColor}`}>
                                                    {sugarStatus.status}
                                                </span>
                                            </div>
                                            <div className={`border rounded-2xl p-4 text-center ${oxygenStatus.bgColor} border-${oxygenStatus.color}-200`}>
                                                <p className="text-xs text-gray-600 mb-1">Oxygen</p>
                                                <p className="font-bold text-lg text-gray-800">{vital.oxygen || '--'}%</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${oxygenStatus.bgColor} ${oxygenStatus.textColor}`}>
                                                    {oxygenStatus.status}
                                                </span>
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                            {patient.vitals[patient.vitals.length - 1].notes && (
                                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Notes:</strong> {patient.vitals[patient.vitals.length - 1].notes}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Medications */}
                    {patient.medications.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Pill size={20} className="mr-2" />
                                Current Medications
                            </h3>
                            <div className="space-y-3">
                                {patient.medications.map((medication:any) => (
                                    <div key={medication.medicationId} className="bg-white border border-gray-200 rounded-2xl p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{medication.name}</h4>
                                                <p className="text-sm text-gray-600">Dosage: {medication.dosage}</p>
                                                <p className="text-sm text-gray-600">Frequency: {medication.frequency} times daily</p>
                                                {medication.notes && (
                                                    <p className="text-sm text-blue-600 mt-1">Notes: {medication.notes}</p>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(medication.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Meals */}
                    {patient.meals.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                <Utensils size={20} className="mr-2" />
                                Recent Meals
                            </h3>
                            <div className="space-y-3">
                                {patient.meals.map((meal:any) => (
                                    <div key={meal.mealId} className="bg-white border border-gray-200 rounded-2xl p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{meal.mealType}</h4>
                                                <p className="text-sm text-gray-600">{meal.description}</p>
                                                {meal.notes && (
                                                    <p className="text-sm text-green-600 mt-1">Notes: {meal.notes}</p>
                                                )}
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(meal.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PatientDetailsModal;