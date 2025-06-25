import { Edit, Filter, Plus, Search, Star, Trash2, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import AddNurseModal from "../modals/AddNurseModal";
import UpdateNurseModal from "../modals/UpdateNurseModal";

const NursesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNurseData, setEditNurseData] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { nurses, fetchNurses } = useAdmin()

  useEffect(()=>{
    fetchNurses();
  },[])
  const filteredNurses = nurses.filter((nurse: any) => {
    const matchesSearch = nurse.userFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nurse.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterAvailability === 'all') return matchesSearch;
    if (filterAvailability === 'available') return matchesSearch && nurse.isAvailable;
    if (filterAvailability === 'unavailable') return matchesSearch && !nurse.isAvailable;

    return matchesSearch;
  });

  return (
    <>
    <div className="space-y-6 hide-scrollbar px-4 md:px-8 py-6">
      {/* Header Actions */}
      <div className="bg-white rounded-2xl hide-scrollbar shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row  lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search nurses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="all">All Nurses</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3">
            {/* <button className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button> */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all">
              <Plus className="w-4 h-4" />
              <span>Add Nurse</span>
            </button>
          </div>
        </div>
      </div>

      {/* Nurses Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nurse
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qualification
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNurses.map((nurse: any) => (
                <tr key={nurse.homeNurseId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {nurse.userFullName.split(' ').map((n: any) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{nurse.userFullName}</div>
                        <div className="text-sm text-gray-500">{nurse.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{nurse.qualification.split(',')[0]}</div>
                    <div className="text-sm text-gray-500">{nurse.qualification.split(',').slice(1).join(',').trim()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{nurse.experienceYears} years</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${nurse.isAvailable
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {nurse.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                    {nurse.availableOn && (
                      <div className="text-xs text-gray-500 mt-1">
                        {nurse.isAvailable ? 'Now' : `Available on ${nurse.availableOn}`}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-900">
                        {nurse.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({nurse.completedCases} cases)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditNurseData({
                            fullName:nurse.userFullName,
                            nurseId: nurse.homeNurseId,
                            qualification: nurse.qualification,
                            experienceYears: nurse.experienceYears,
                            bio: nurse.bio,
                            dob: nurse.dob,
                            availableOn: nurse.availableOn,
                            isAvailable: nurse.isAvailable,
                          });
                          
                          setIsEditModalOpen(true);
                        }}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="w-5 h-5" />
                      </button>

                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredNurses.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No nurses found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchTerm
                ? `No nurses match your search for "${searchTerm}"`
                : filterAvailability === 'available'
                  ? "No available nurses at this time"
                  : filterAvailability === 'unavailable'
                    ? "All nurses are currently available"
                    : "No nurses registered yet"}
            </p>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterAvailability('all');
                }}
                className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>


    </div>
      <AddNurseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      // onSubmit={handleAddNurse}
      />
      <UpdateNurseModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditNurseData(null);
        }}
        nurseId={editNurseData?.nurseId || ''}
        initialData={editNurseData}
      />
    </>
  );
};

export default NursesManagement