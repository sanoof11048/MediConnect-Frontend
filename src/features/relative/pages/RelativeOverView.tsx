import { useState } from 'react'
import StatCard from '../components/StatCard'
import { DollarSign, Heart, Plus, Stethoscope, User, Users } from 'lucide-react';
import PatientCard from '../components/PatientCard';

export default function RelativeOverView() {
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
      const [nurses, setNurses] = useState([
          {
            id: 1,
            name: 'Sarah Johnson',
            experience: '8 years',
            specialization: 'Geriatric Care',
            rating: 4.8,
            hourlyRate: 35,
            phone: '+1-555-0201',
            email: 'sarah.j@homecare.com',
            status: 'Active',
            patients: ['John Smith'],
            totalHours: 160,
            weeklySchedule: 'Mon-Fri, 9AM-5PM',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3aba90&color=fff'
          },
          {
            id: 2,
            name: 'Mike Davis',
            experience: '5 years',
            specialization: 'Dementia Care',
            rating: 4.6,
            hourlyRate: 32,
            phone: '+1-555-0202',
            email: 'mike.d@homecare.com',
            status: 'Active',
            patients: ['Mary Johnson'],
            totalHours: 140,
            weeklySchedule: 'Mon-Sat, 8AM-4PM',
            avatar: 'https://ui-avatars.com/api/?name=Mike+Davis&background=1a98cd&color=fff'
          },
          {
            id: 3,
            name: 'Emma Wilson',
            experience: '3 years',
            specialization: 'Post-Surgery Care',
            rating: 4.7,
            hourlyRate: 30,
            phone: '+1-555-0203',
            email: 'emma.w@homecare.com',
            status: 'Available',
            patients: ['Robert Wilson'],
            totalHours: 120,
            weeklySchedule: 'Flexible',
            avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=3aba90&color=fff'
          }
        ]);
  return (
<div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Patients" value={patients.length} icon={User} trend={12} color="#1a98cd" />
                <StatCard title="Active Nurses" value={nurses.filter(n => n.status === 'Active').length} icon={Stethoscope} trend={8} color="#3aba90" />
                <StatCard title="Critical Cases" value={patients.filter(p => p.status === 'Critical').length} icon={Heart} trend={-15} color="#ef4444" />
                <StatCard title="Monthly Cost" value="$12,850" icon={DollarSign} trend={5} color="#3aba90" />
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Patient Overview</h3>
                    <div className="space-y-4">
                      {patients.slice(0, 3).map(patient => (
                        <PatientCard key={patient.id} patient={patient} isCompact={true} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full p-4 text-left bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Plus size={20} style={{ color: '#1a98cd' }} />
                          <span className="font-medium text-gray-700">Add New Patient</span>
                        </div>
                      </button>
                      <button className="w-full p-4 text-left bg-teal-50 rounded-2xl hover:bg-teal-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Users size={20} style={{ color: '#3aba90' }} />
                          <span className="font-medium text-gray-700">Hire Nurse</span>
                        </div>
                      </button>
                      <button className="w-full p-4 text-left bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <DollarSign size={20} style={{ color: '#3aba90' }} />
                          <span className="font-medium text-gray-700">Process Payment</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
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
                  </div>
                </div>
              </div>
            </div>  )
}

