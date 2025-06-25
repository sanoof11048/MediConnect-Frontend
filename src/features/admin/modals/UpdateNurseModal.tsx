import { useEffect, useState } from 'react';
import {
  X,
  ClipboardEdit,
  CalendarCheck2,
  BookOpenCheck,
  Smile,
  CheckCircle2,
  Edit,
  User,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axiosAuth from '../../../api/axiosAuth';

interface UpdateNurseProfileDTO {
  fullName?: string;
  qualification?: string;
  experienceYears: number;
  bio?: string;
  dob?: string;
  availableOn?: string;
  isAvailable?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nurseId: string;
  initialData?: UpdateNurseProfileDTO;
  onSuccess?: () => void;
}

interface FormErrors {
  fullName?: string;
  qualification?: string;
  experienceYears?: string;
  bio?: string;
  dob?: string;
  availableOn?: string;
}

export default function UpdateNurseModal({
  isOpen,
  onClose,
  nurseId,
  initialData,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<UpdateNurseProfileDTO>({
    fullName: initialData?.fullName || '',
    qualification: initialData?.qualification || '',
    experienceYears: initialData?.experienceYears || 0,
    bio: initialData?.bio || '',
    dob: initialData?.dob || '',
    availableOn: initialData?.availableOn || '',
    isAvailable: initialData?.isAvailable ?? true,
  });
  useEffect(()=>{
    setForm({
    fullName: initialData?.fullName || '',
    qualification: initialData?.qualification || '',
    experienceYears: initialData?.experienceYears || 0,
    bio: initialData?.bio || '',
    dob: initialData?.dob || '',
    availableOn: initialData?.availableOn || '',
    isAvailable: initialData?.isAvailable ?? true,
  })
  },[initialData])

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (form.fullName.length > 100) {
      newErrors.fullName = 'Full name must be less than 100 characters';
    }

    if (form.qualification && form.qualification.length > 100) {
      newErrors.qualification = 'Qualification must be less than 100 characters';
    }

    if (form.experienceYears < 0 || form.experienceYears > 50) {
      newErrors.experienceYears = 'Experience must be between 0 and 50 years';
    }

    if (form.bio && form.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (form.dob) {
      const dobDate = new Date(form.dob);
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      if (dobDate > today) {
        newErrors.dob = 'Date of birth cannot be in the future';
      } else if (age < 18 || age > 80) {
        newErrors.dob = 'Age must be between 18 and 80 years';
      }
    }

    if (form.availableOn) {
      const availableDate = new Date(form.availableOn);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (availableDate < today) {
        newErrors.availableOn = 'Available date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : type === 'number' ? parseInt(value) || 0 : value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Please fix the validation errors');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        fullName: form.fullName?.trim() || null,
        qualification: form.qualification?.trim() || null,
        experienceYears: form.experienceYears,
        bio: form.bio?.trim() || null,
        dob: form.dob || null,
        availableOn: form.availableOn || null,
        isAvailable: form.isAvailable,
      };

      const res = await axiosAuth.put(`/Admin/update-nurse/${nurseId}`, payload);

      if (res.data.success) {
        toast.success('Nurse profile updated successfully!');
        onSuccess?.();
        onClose();
      } else {
        toast.error(res.data.message || 'Failed to update nurse profile');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error updating nurse profile');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed hide-scrollbar inset-0 bg-transparent z-40 " onClick={handleClose} />
      <div className="fixed hide-scrollbar inset-0 z-50 flex items-center h-screen justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#1a97cd] to-[#3aba90] text-white p-6 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Edit className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Update Nurse Profile</h2>
            </div>
            <button onClick={handleClose} className="hover:bg-white/20 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form className="space-y-5 p-6" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpenCheck className="w-4 h-4 inline mr-2" />
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={form.qualification}
                onChange={handleInputChange}
                maxLength={100}
                placeholder="e.g., RN, BSN, MSN"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.qualification ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <ClipboardEdit className="w-4 h-4 inline mr-2" />
                Experience (Years)
              </label>
              <input
                type="number"
                name="experienceYears"
                value={form.experienceYears}
                onChange={handleInputChange}
                placeholder="e.g., 5"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.experienceYears ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.experienceYears && <p className="text-red-500 text-sm mt-1">{errors.experienceYears}</p>}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                rows={3}
                maxLength={500}
                value={form.bio}
                onChange={handleInputChange}
                placeholder="Tell something about the nurse..."
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.bio ? 'border-red-500' : 'border-gray-300'}`}
              />
              <div className="text-sm text-gray-500 flex justify-between mt-1">
                <span>{form.bio?.length || 0}/500</span>
                {errors.bio && <p className="text-red-500">{errors.bio}</p>}
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Smile className="w-4 h-4 inline mr-2" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarCheck2 className="w-4 h-4 inline mr-2" />
                  Available From
                </label>
                <input
                  type="date"
                  name="availableOn"
                  value={form.availableOn}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a97cd] ${errors.availableOn ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.availableOn && <p className="text-red-500 text-sm mt-1">{errors.availableOn}</p>}
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-[#1a98cd] border-gray-300 rounded focus:ring-[#1a98cd]"
              />
              <label className="text-gray-700 text-sm">Currently Available for New Cases</label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={handleClose}
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Update Profile
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
