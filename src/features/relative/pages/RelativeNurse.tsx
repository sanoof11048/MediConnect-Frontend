import { useState } from 'react'
import NurseCard from '../components/NurseCard'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function RelativeNurse() {
    const navigate = useNavigate()
      const [nurses] = useState([]);
    return (
        <div className='px-4 md:px-8 py-6'>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">Care Team Management</h3>
                    <p className="text-gray-600">Manage your healthcare professionals</p>
                </div>
                <button
                    onClick={()=>navigate("/relative/plans")}
                    className="px-6 py-3 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    style={{ backgroundColor: '#3aba90' }}
                >
                    <Plus size={20} className="inline mr-2" />
                    Hire Nurse
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {nurses.map((nurse:any,index:number) => (
                    <NurseCard key={index} nurse={nurse} />
                ))}
            </div>
        </div>)
}

export default RelativeNurse