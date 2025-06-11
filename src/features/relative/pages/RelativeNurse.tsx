<<<<<<< HEAD
import { useState } from 'react'
import NurseCard from '../components/NurseCard'
import { Plus } from 'lucide-react'

function RelativeNurse() {
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
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Care Team Management</h3>
                    <p className="text-gray-600">Manage your healthcare professionals</p>
                </div>
                <button
                    onClick={() => setNurses([])}
                    className="px-6 py-3 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{ backgroundColor: '#3aba90' }}
                >
                    <Plus size={20} className="inline mr-2" />
                    Hire Nurse
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {nurses.map(nurse => (
                    <NurseCard key={nurse.id} nurse={nurse} />
                ))}
            </div>
        </div>)
}

=======
import { useState } from 'react'
import NurseCard from '../components/NurseCard'
import { Plus } from 'lucide-react'

function RelativeNurse() {
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
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Care Team Management</h3>
                    <p className="text-gray-600">Manage your healthcare professionals</p>
                </div>
                <button
                    onClick={() => setNurses([])}
                    className="px-6 py-3 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{ backgroundColor: '#3aba90' }}
                >
                    <Plus size={20} className="inline mr-2" />
                    Hire Nurse
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {nurses.map(nurse => (
                    <NurseCard key={nurse.id} nurse={nurse} />
                ))}
            </div>
        </div>)
}

>>>>>>> 7697930 (Initial commit3)
export default RelativeNurse