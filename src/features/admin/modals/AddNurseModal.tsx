import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, Calendar, FileText, Award, Clock } from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import toast from 'react-hot-toast';

interface NurseProfileCreateDTO {
  homeNurseId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  dob: string;
  availableOn: string;
  isAvailable: boolean;
}

interface AddNurseModalProps {
  isOpen: boolean;
  onClose: () => void;
  //   onSubmit: (nurseData: NurseProfileCreateDTO) => Promise<void>;
}
const initialData = {
    homeNurseId: crypto.randomUUID(),
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    qualification: '',
    experienceYears: 0,
    bio: '',
    dob: '',
    availableOn: '',
    isAvailable: true
  }

const AddNurseModal: React.FC<AddNurseModalProps> = ({ isOpen, onClose }) => {
  const { handleAddNurse } = useAdmin()
  const [formData, setFormData] = useState<NurseProfileCreateDTO>({ ...initialData });

  const [errors, setErrors] = useState<Partial<Record<keyof NurseProfileCreateDTO, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NurseProfileCreateDTO, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length > 100) {
      newErrors.fullName = 'Full name must be less than 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required';
    } else if (formData.qualification.length > 100) {
      newErrors.qualification = 'Qualification must be less than 100 characters';
    }

    if (formData.experienceYears < 0 || formData.experienceYears > 50) {
      newErrors.experienceYears = 'Experience years must be between 0 and 50';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!formData.availableOn) {
      newErrors.availableOn = 'Available date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 :
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof NurseProfileCreateDTO]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    console.log(errors);

    if (!validateForm()) return;



    setIsSubmitting(true);

    try {
      await handleAddNurse(formData);
      toast.success("Nurse added successfully!");
      setFormData({ ...initialData });
      onClose();
    } catch (error) {
      toast.error("Failed to add nurse!");
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 h-screen bg-opacity-50 flex scrollbar-hide items-center justify-center z-50 p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#1a97cd] to-[#3aba90] text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Add New Nurse</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd]"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Enter password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.dob ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Available From *
                </label>
                <input
                  type="date"
                  name="availableOn"
                  value={formData.availableOn}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.availableOn ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.availableOn && <p className="text-red-500 text-sm mt-1">{errors.availableOn}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Award className="w-4 h-4 inline mr-2" />
                  Qualification *
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.qualification ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="e.g., BSN, RN, MSN"
                />
                {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Experience (Years)
                </label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  min="0"
                  max="50"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.experienceYears ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="0"
                />
                {errors.experienceYears && <p className="text-red-500 text-sm mt-1">{errors.experienceYears}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] resize-none ${errors.bio ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Brief description about the nurse..."
              />
              {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
            </div>

            <div className="flex items-center">
              <label htmlFor="isAvailable" className="mr-3 text-sm text-gray-700">
                Currently Available
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3aba90] relative" />
              </label>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#1a97cd] to-[#3aba90] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding Nurse...' : 'Add Nurse'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNurseModal;