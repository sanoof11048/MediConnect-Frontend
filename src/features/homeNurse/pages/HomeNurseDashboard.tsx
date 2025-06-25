import React, { useEffect, useMemo, useState } from 'react';
import { useHomeNurse, type MealDTO, type MedicationDTO, type VitalDTO } from '../../../context/HomeNurseContext';
import { User } from 'lucide-react';
import HomeNurseLayout from '../../../layouts/HomeNurseLayout';
import HomeNurseTabNavigation from '../components/HomeNurseTabNavigation';
import HomeNursePatientOverview from '../components/HomNursePatientOverView';
import VitalsTable from './VitalTable';
import MedicationsTable from './MedicationsTable';
import MealsTable from './MealsTable';
import AddEditModal from '../modals/AddEditModal';

const HomeNurseDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vitals' | 'medications' | 'meals'>('vitals');
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    patients,
    vitals,
    medications,
    meals,
    fetchVitals,
    fetchMedications,
    fetchMeals,
    addVital,
    updateVital,
    deleteVital,
    addMedication,
    updateMedication,
    deleteMedication,
    addMeal,
    updateMeal,
    deleteMeal
  } = useHomeNurse();

  useEffect(() => {
    if (selectedPatient) {
      fetchVitals(selectedPatient);
      fetchMedications(selectedPatient);
      fetchMeals(selectedPatient);
    }
  }, [selectedPatient]);

  const filteredPatients = useMemo(
    () => patients.filter(p => p.fullName.toLowerCase().includes(searchTerm)),
    [patients, searchTerm]
  );

  const vitalsCount = useMemo(() => vitals.filter(v => v.patientId === selectedPatient).length, [vitals, selectedPatient]);
  const medicationsCount = useMemo(() => medications.filter(m => m.patientId === selectedPatient).length, [medications, selectedPatient]);
  const mealsCount = useMemo(() => meals.filter(m => m.patientId === selectedPatient).length, [meals, selectedPatient]);

  const handleAddNew = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = (formData: any) => {
    if (activeTab === 'vitals') {
      editingItem
        ? updateVital({ ...(formData as VitalDTO), vitalId: (editingItem as VitalDTO).vitalId })
        : addVital({ ...formData, patientId: selectedPatient });
    }
    else if (activeTab === 'medications') {
      editingItem
        ? updateMedication({ ...(formData as MedicationDTO), medicationId: (editingItem as MedicationDTO).medicationId })
        : addMedication({ ...formData, patientId: selectedPatient });
    }
    else {
      editingItem
        ? updateMeal({ ...(formData as MealDTO), mealId: (editingItem as MealDTO).mealId })
        : addMeal({ ...formData, patientId: selectedPatient });
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    if (activeTab === 'vitals') deleteVital(id);
    else if (activeTab === 'medications') deleteMedication(id);
    else deleteMeal(id);
  };

  return (
    <HomeNurseLayout
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
      selectedPatientId={selectedPatient}
      patients={filteredPatients}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setSelectedPatient={setSelectedPatient}
    >

      {selectedPatient ? (
        <>

          <HomeNurseTabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            vitalsCount={vitalsCount}
            medicationsCount={medicationsCount}
            mealsCount={mealsCount}
          />

          <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
            <HomeNursePatientOverview patient={patients.find(p => p.id === selectedPatient)} />
            {activeTab === 'vitals' && (
              <VitalsTable
                data={vitals.filter(v => v.patientId === selectedPatient)}
                onAddNew={() => { setEditingItem(null); setShowModal(true); }}
                onEdit={(item) => { setEditingItem(item); setShowModal(true); }}
                onDelete={handleDelete}
              />
            )}

            {activeTab === 'medications' && (
              <MedicationsTable
                data={medications.filter(m => m.patientId === selectedPatient)}
                onAddNew={handleAddNew}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            {activeTab === 'meals' && (
              <MealsTable
                data={meals.filter(m => m.patientId === selectedPatient)}
                onAddNew={handleAddNew}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </main>
        </>
      ) : (
        <main className="flex-1 overflow-y-auto flex items-center justify-center p-8 bg-gray-50">
          <div className="text-center max-w-md">
            <div className="p-6 bg-gradient-to-br from-[#1a98cd]/10 to-[#3aba90]/10 rounded-2xl w-fit mx-auto mb-6">
              <User className="h-12 w-12 text-[#1a98cd]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Select a Patient</h3>
            <p className="text-gray-600 mb-6">
              Choose a patient from the sidebar to view and manage their health records, medications, and meal plans.
            </p>
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="px-6 py-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] hover:from-[#1580b5] hover:to-[#2d9975] text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Browse Patients
            </button>
          </div>
        </main>
      )}

      {showModal && (
        <AddEditModal
          activeTab={activeTab}
          editingItem={editingItem}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </HomeNurseLayout>
  );
};

export default HomeNurseDashboard;