// RelativeOverView.jsx (with minor improvements)
import { useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import { DollarSign, PersonStanding, Plus, User, Users } from 'lucide-react';
import PatientCard from '../components/PatientCard';
import PatientDetailsModal from '../modals/PatientDetailsModal';
import AddPatientModal from '../modals/AddPatientModal';
import { useRelative } from '../../../context/RelativeContext';
import { useNavigate } from 'react-router-dom';
import axiosAuth from '../../../api/axiosAuth';

export default function RelativeOverView() {
  // const [patients, setPatients] = useState<any>([]);
  const { patients, } = useRelative()
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()
  const handleViewDetails = (patient: any) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  useEffect(() => {
    if (patients) {
      axiosAuth.get("Payment/my-payments").then((res) => {
        console.log(res)
      })
      setLoading(false)
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 md:px-8 py-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Total Patients"
          value={patients.length}
          icon={User}
          trend={12}
          color="#1a98cd"
        />
        <StatCard
          title="Pending Payment"
          value="$12,850"
          icon={PersonStanding}
          trend={8}
          color="#3aba90"
        />
        <StatCard
          title="Monthly Cost"
          value="$12,850"
          icon={DollarSign}
          trend={5}
          color="#3aba90"
        />
        {/* <StatCard title="Available Nurses" value={nurses.filter(n => n.status === 'Available').length} icon={Users} trend={3} color="#1a98cd" /> */}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Patient Overview</h3>
            <div className="space-y-4">
              {patients.length > 0 ? (
                patients.slice(0, 3).map((patient: any, index: any) => (
                  <PatientCard key={index} patient={patient} onViewDetails={handleViewDetails} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No patients found</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setAddModalOpen(true)}
                className="w-full p-4 text-left bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Plus size={20} style={{ color: '#1a98cd' }} />
                  <span className="font-medium text-gray-700">Add New Patient</span>
                </div>
              </button>

              <button
                onClick={() => navigate("/relative/plans")}

                className="w-full p-4 text-left bg-teal-50 rounded-2xl hover:bg-teal-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Users size={20} style={{ color: '#3aba90' }} />
                  <span className="font-medium text-gray-700">Hire Nurse</span>
                </div>
              </button>
              <button
                onClick={() => navigate("/relative/payments")}
                className="w-full p-4 text-left bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <DollarSign size={20} style={{ color: '#3aba90' }} />
                  <span className="font-medium text-gray-700">Process Payment</span>
                </div>
              </button>
            </div>
          </div>

          {/* <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Urgent Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-2xl border-l-4 border-red-500">
                <p className="text-sm font-medium text-red-800">Mary Johnson requires immediate attention</p>
                <p className="text-xs text-red-600 mt-1">Blood pressure elevated</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-2xl border-l-4 border-yellow-500">
                <p className="text-sm font-medium text-yellow-800">Payment due for Mike Davis</p>
                <p className="text-xs text-yellow-600 mt-1">$1,120 pending</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      <AddPatientModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />

    </div>
  );
}