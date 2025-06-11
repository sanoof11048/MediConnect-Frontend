<<<<<<< HEAD
import { Phone, Star, Trash2 } from "lucide-react";

  const NurseCard = ({ nurse }:any) => (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img src={nurse.avatar} alt={nurse.name} className="w-14 h-14 rounded-full border-2 border-gray-200" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{nurse.name}</h3>
            <p className="text-gray-600">{nurse.specialization}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{nurse.rating} ({nurse.experience})</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          nurse.status === 'Active' ? 'bg-green-100 text-green-800' :
          nurse.status === 'Available' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {nurse.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 mb-1">Hourly Rate</p>
          <p className="font-bold text-gray-800">${nurse.hourlyRate}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 mb-1">Patients</p>
          <p className="font-bold text-gray-800">{nurse.patients.length}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 py-2 px-4 text-sm font-medium border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
          <Phone size={14} className="inline mr-2" />
          Contact
        </button>
        {nurse.status === 'Active' && (
          <button 
            // onClick={() => handleFireNurse(nurse.id)}
            className="py-2 px-4 text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
=======
import { Phone, Star, Trash2 } from "lucide-react";

  const NurseCard = ({ nurse }:any) => (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <img src={nurse.avatar} alt={nurse.name} className="w-14 h-14 rounded-full border-2 border-gray-200" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{nurse.name}</h3>
            <p className="text-gray-600">{nurse.specialization}</p>
            <div className="flex items-center space-x-1 mt-1">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{nurse.rating} ({nurse.experience})</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          nurse.status === 'Active' ? 'bg-green-100 text-green-800' :
          nurse.status === 'Available' ? 'bg-blue-100 text-blue-800' :
          'bg-red-100 text-red-800'
        }`}>
          {nurse.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 mb-1">Hourly Rate</p>
          <p className="font-bold text-gray-800">${nurse.hourlyRate}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-2xl">
          <p className="text-xs text-gray-500 mb-1">Patients</p>
          <p className="font-bold text-gray-800">{nurse.patients.length}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 py-2 px-4 text-sm font-medium border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
          <Phone size={14} className="inline mr-2" />
          Contact
        </button>
        {nurse.status === 'Active' && (
          <button 
            // onClick={() => handleFireNurse(nurse.id)}
            className="py-2 px-4 text-sm font-medium bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
>>>>>>> 7697930 (Initial commit3)
  export default NurseCard