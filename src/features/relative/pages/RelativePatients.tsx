import { Plus } from 'lucide-react'
import  { useState } from 'react'
import PatientCard from '../components/PatientCard';

function RelativePatients() {
    const [patients, setPatients] = useState([
        {
            id: 1,
            name: 'John Smith',
            age: 78,
            condition: 'Diabetes, Hypertension',
            assignedNurse: 'Sarah Johnson',
            status: 'Stable',
            lastVisit: '2025-06-08',
            medications: ['Metformin 500mg', 'Lisinopril 10mg'],
            vitals: { bp: '130/80', pulse: '72', temp: '98.6°F' },
            notes: 'Patient is responding well to treatment. Blood sugar levels stable.',
            emergencyContact: '+1-555-0123',
            avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=1a98cd&color=fff'
        },
        {
            id: 2,
            name: 'Mary Johnson',
            age: 82,
            condition: 'Alzheimer\'s, Arthritis',
            assignedNurse: 'Mike Davis',
            status: 'Critical',
            lastVisit: '2025-06-07',
            medications: ['Donepezil 10mg', 'Ibuprofen 400mg'],
            vitals: { bp: '140/90', pulse: '78', temp: '99.1°F' },
            notes: 'Memory issues worsening. Requires constant supervision.',
            emergencyContact: '+1-555-0124',
            avatar: 'https://ui-avatars.com/api/?name=Mary+Johnson&background=3aba90&color=fff'
        },
        {
            id: 3,
            name: 'Robert Wilson',
            age: 65,
            condition: 'Post-Surgery Recovery',
            assignedNurse: 'Emma Wilson',
            status: 'Improving',
            lastVisit: '2025-06-09',
            medications: ['Oxycodone 5mg', 'Antibiotics'],
            vitals: { bp: '125/75', pulse: '68', temp: '98.2°F' },
            notes: 'Recovery progressing well. Physical therapy recommended.',
            emergencyContact: '+1-555-0125',
            avatar: 'https://ui-avatars.com/api/?name=Robert+Wilson&background=1a98cd&color=fff'
        }
    ]);
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Patient Management</h3>
                    <p className="text-gray-600">Monitor and manage all patient care</p>
                </div>
                <button
                    //   onClick={() => setShowAddPatient(true)}
                    className="px-6 py-3 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{ backgroundColor: '#1a98cd' }}
                >
                    <Plus size={20} className="inline mr-2" />
                    Add Patient
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {patients.map(patient => (
                    <PatientCard key={patient.id} patient={patient} />
                ))}
            </div>
        </div>)
}

export default RelativePatients