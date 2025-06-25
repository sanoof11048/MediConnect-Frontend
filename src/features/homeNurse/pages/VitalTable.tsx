import React from 'react';
import { Activity, Clock, Droplets, Thermometer, Edit, Trash2, Plus } from 'lucide-react';

interface VitalsTableProps {
  data: any[];
  onAddNew: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

const VitalsTable: React.FC<VitalsTableProps> = ({ data, onAddNew, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Patient Vitals</h3>
              <p className="text-gray-600">Monitor and track vital signs</p>
            </div>
          </div>
          <button
            onClick={onAddNew}
            className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] hover:from-[#1580b5] hover:to-[#2d9975] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">Add Vital</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Blood Pressure</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Blood Sugar</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Temperature</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pulse</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Oxygen</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((vital, index) => (
              <tr key={vital.vitalId} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(vital.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(vital.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-900">{vital.bloodPressure || 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">{vital.bloodSugar ? `${vital.bloodSugar} mg/dL` : 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-900">{vital.temperature ? `${vital.temperature}°F` : 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-900">{vital.pulse ? `${vital.pulse} bpm` : 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-900">{vital.oxygen ? `${vital.oxygen}%` : 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm text-gray-900 max-w-xs">
                  <div className="truncate">{vital.notes || 'No notes'}</div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(vital)}
                      className="p-2 text-[#1a98cd] hover:bg-[#1a98cd]/10 rounded-lg transition-all"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(vital.vitalId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {data.length === 0 && (
          <div className="text-center py-16">
            <div className="p-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl w-fit mx-auto mb-4">
              <Activity className="h-12 w-12 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vitals recorded</h3>
            <p className="text-gray-600">Get started by adding the first vital reading for this patient.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VitalsTable;