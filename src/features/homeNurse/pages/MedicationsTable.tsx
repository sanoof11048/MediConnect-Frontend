import React from 'react';
import { Pill, Clock, Edit, Trash2, Plus } from 'lucide-react';

interface MedicationsTableProps {
  data: any[];
  onAddNew: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

const MedicationsTable: React.FC<MedicationsTableProps> = ({ data, onAddNew, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Medication Log</h3>
              <p className="text-gray-600">Track medications and dosages</p>
            </div>
          </div>
          <button
            onClick={onAddNew}
            className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] hover:from-[#1580b5] hover:to-[#2d9975] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            <span className="font-medium">Add Medication</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Medication</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Dosage</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Frequency</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((medication, index) => (
              <tr key={medication.medicationId} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Pill className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{medication.name}</span>
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {medication.dosage}
                  </span>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-900">{medication.frequency}</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm text-gray-900 max-w-xs">
                  <div className="truncate">{medication.notes || 'No notes'}</div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {new Date(medication.updatedAt).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(medication)}
                      className="p-2 text-[#1a98cd] hover:bg-[#1a98cd]/10 rounded-lg transition-all"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(medication.medicationId)}
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
            <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl w-fit mx-auto mb-4">
              <Pill className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No medications recorded</h3>
            <p className="text-gray-600">Add medications to track for this patient.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationsTable;