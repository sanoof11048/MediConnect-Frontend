import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

interface AddEditModalProps {
  activeTab: string;
  editingItem: any;
  onClose: () => void;
  onSave: (formData: any) => void;
}

const AddEditModal: React.FC<AddEditModalProps> = ({ activeTab, editingItem, onClose, onSave }) => {
  const [formData, setFormData] = useState<any>(editingItem || {
    bloodPressure: '',
    bloodSugar: '',
    temperature: '',
    pulse: '',
    oxygen: '',
    notes: '',
    name: '',
    dosage: '',
    frequency: '',
    mealType: 'Breakfast',
    description: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        bloodPressure: '',
        bloodSugar: '',
        temperature: '',
        pulse: '',
        oxygen: '',
        notes: '',
        name: '',
        dosage: '',
        frequency: '',
        mealType: 'Breakfast',
        description: ''
      });
    }
  }, [editingItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              {editingItem ? 'Edit' : 'Add New'} {activeTab === 'vitals' ? 'Vital' : activeTab === 'medications' ? 'Medication' : 'Meal'}
            </h3>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-50">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {activeTab === 'vitals' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                  <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    placeholder="e.g. 120/80"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Sugar (mg/dL)</label>
                  <input
                    type="number"
                    name="bloodSugar"
                    value={formData.bloodSugar}
                    onChange={handleChange}
                    placeholder="e.g. 95"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°F)</label>
                  <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="e.g. 98.6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pulse (bpm)</label>
                  <input
                    type="number"
                    name="pulse"
                    value={formData.pulse}
                    onChange={handleChange}
                    placeholder="e.g. 72"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oxygen Level (%)</label>
                  <input
                    type="number"
                    name="oxygen"
                    value={formData.oxygen}
                    onChange={handleChange}
                    placeholder="e.g. 98"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  placeholder="Additional notes about the vitals..."
                ></textarea>
              </div>
            </div>
          )}
          
          {activeTab === 'medications' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Metformin"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    placeholder="e.g. 500mg"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    placeholder="e.g. Twice daily"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  placeholder="Special instructions or notes..."
                ></textarea>
              </div>
            </div>
          )}
          
          {activeTab === 'meals' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                <select
                  name="mealType"
                  value={formData.mealType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="e.g. Oatmeal with fruits, low-fat milk"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a98cd] focus:border-transparent"
                  placeholder="Patient's response to the meal, special considerations..."
                ></textarea>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] hover:from-[#1580b5] hover:to-[#2d9975] text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>{editingItem ? 'Save Changes' : 'Add Record'}</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditModal;