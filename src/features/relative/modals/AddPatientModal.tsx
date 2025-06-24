import { useState } from 'react';
import { X, User, Stethoscope, FileText, Camera, Sparkles, UserPlus2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosAuth from '../../../api/axiosAuth';
import { useRelative } from '../../../context/RelativeContext';

interface FormData {
    fullName: string;
    age: string;
    gender: string;
    dob: string;
    careType: string;
    serviceType: string;
    medicalHistory: string;
    photoFile: File | null;
    physicalCondition: number;
}

interface AddPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose }) => {
    const { fetchPatients } = useRelative()
    const [form, setForm] = useState<FormData>({
        fullName: '',
        age: '',
        gender: '',
        dob: '',
        careType: '',
        serviceType: '',
        medicalHistory: '',
        photoFile: null,
        physicalCondition: 0
    });

    const physicalConditions = [
        { label: "On Bed", value: 1 },
        { label: "Can Walk", value: 2 },
        { label: "Need Support to Walk", value: 4 },
        { label: "Wheelchair User", value: 8 },
        { label: "Partially Paralyzed", value: 16 },
        { label: "Unconscious", value: 32 },
    ];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type, files } = target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'file' ? files?.[0] || null : value,
        }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setForm(prev => ({ ...prev, photoFile: e.dataTransfer.files[0] }));
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('fullName', form.fullName);
        formData.append('age', form.age);
        formData.append('gender', form.gender);
        formData.append('dob', new Date(form.dob).toISOString().split('T')[0]);
        formData.append('careType', form.careType);
        formData.append('serviceType', form.serviceType);
        formData.append('medicalHistory', form.medicalHistory || '');
        formData.append('physicalCondition', form.physicalCondition.toString()); // ✅ Add this

        if (form.photoFile) {
            formData.append('photoFile', form.photoFile);
        }

        try {
            const response = await axiosAuth.post('/Patient', formData);
            console.log(response.data);
            if (response.data.success) {
                toast.success('Patient added successfully!');
                onClose();
                setForm({
                    fullName: '',
                    age: '',
                    gender: '',
                    dob: '',
                    careType: '',
                    serviceType: '',
                    medicalHistory: '',
                    photoFile: null,
                    physicalCondition: 0
                });
                fetchPatients()
            } else {
                toast.error(response.data.message || 'Failed to add patient');
            }
        } catch (error) {
            toast.error('Error occurred while adding patient');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };



    if (!isOpen) return null;

    return (
        <>

            <div
                className="fixed inset-0 bg-gradient-to-br from-black/60 via-[#1a98cd]/20 to-black/60 animate-in fade-in duration-300 z-[999]"
                onClick={onClose}
            />
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">


                <div className="relative w-full max-w-4xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 animate-in zoom-in-95 duration-300">
                    {/* Header with gradient */}
                    <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-[#1a98cd] to-[#3aba90] p-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a98cd]/90 to-[#3aba90]/90" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Add New Patient</h2>
                                    <p className="text-white/80 text-sm">Create a comprehensive patient profile</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Form content */}
                    <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information Section */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <User className="w-5 h-5 text-[#1a98cd]" />
                                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                                </div>

                                <div className="relative">
                                    <input
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1a98cd] focus:bg-white transition-all duration-200 outline-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="age"
                                        type="number"
                                        value={form.age}
                                        onChange={handleChange}
                                        placeholder="Age"
                                        className="px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1a98cd] focus:bg-white transition-all duration-200 outline-none"
                                        required
                                    />
                                    <select
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                        className="px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1a98cd] focus:bg-white transition-all duration-200 outline-none"
                                        required
                                    >
                                        <option value="">Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="relative">
                                    <input
                                        name="dob"
                                        type="date"
                                        value={form.dob}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1a98cd] focus:bg-white transition-all duration-200 outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Medical Information Section */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Stethoscope className="w-5 h-5 text-[#3aba90]" />
                                    <h3 className="text-lg font-semibold text-gray-800">Medical Information</h3>
                                </div>

                                <select
                                    name="careType"
                                    value={form.careType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#3aba90] focus:bg-white transition-all duration-200 outline-none"
                                    required
                                >
                                    <option value="">Select Care Type</option>
                                    <option value="ShortTerm">Short Term Care</option>
                                    <option value="LongTerm">Long Term Care</option>
                                    <option value="PalliativeCare">Palliative Care</option>
                                    <option value="Rehabilitation">Rehabilitation</option>
                                    <option value="PostSurgicalCare">Post Surgical Care</option>
                                    <option value="ChronicIllnessCare">Chronic Illness Care</option>
                                    <option value="EmergencyCare">Emergency Care</option>
                                </select>

                                <select
                                    name="serviceType"
                                    value={form.serviceType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#3aba90] focus:bg-white transition-all duration-200 outline-none"
                                    required
                                >
                                    <option value="">Select Service Type</option>
                                    <option value="NeurologicalCare">Neurological Care</option>
                                    <option value="PostOperativeCare">Post Operative Care</option>
                                    <option value="CancerCare">Cancer Care</option>
                                    <option value="PhysioTherapy">Physiotherapy</option>
                                    <option value="ElderlyMedicalCare">Elderly Medical Care</option>
                                    <option value="TracheostomyCare">Tracheostomy Care</option>
                                    <option value="HomePhysioTherapy">Home Physiotherapy</option>
                                </select>
                            </div>
                        </div>

                        {/* Medical History */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <FileText className="w-5 h-5 text-[#1a98cd]" />
                                <h3 className="text-lg font-semibold text-gray-800">Medical History</h3>
                            </div>
                            <textarea
                                name="medicalHistory"
                                value={form.medicalHistory}
                                onChange={handleChange}
                                placeholder="Enter detailed medical history, allergies, current medications, and any relevant health information..."
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#1a98cd] focus:bg-white transition-all duration-200 outline-none resize-none"
                            />
                        </div>

                        {/* Physical Condition Section */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-[#3aba90]" />
                                <h3 className="text-lg font-semibold text-gray-800">Physical Condition</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {physicalConditions.map(({ label, value }) => (
                                    <label key={value} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={(form.physicalCondition & value) === value}
                                            onChange={() => {
                                                setForm(prev => ({
                                                    ...prev,
                                                    physicalCondition:
                                                        (prev.physicalCondition & value) === value
                                                            ? prev.physicalCondition - value
                                                            : prev.physicalCondition + value
                                                }));
                                            }}
                                            className="w-4 h-4 text-[#3aba90] bg-gray-100 border-gray-300 rounded focus:ring-[#3aba90] focus:ring-2"
                                        />
                                        <span className="text-gray-700 font-medium">{label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Physical Condition Value Display */}
                            {form.physicalCondition > 0 && (
                                <div className="p-3 bg-[#3aba90]/10 rounded-xl">
                                    <p className="text-sm text-[#3aba90] font-medium">
                                        Selected conditions value: {form.physicalCondition}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Camera className="w-5 h-5 text-[#3aba90]" />
                                <h3 className="text-lg font-semibold text-gray-800">Patient Photo</h3>
                            </div>
                            <div
                                className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ${dragActive
                                    ? 'border-[#3aba90] bg-[#3aba90]/5'
                                    : 'border-gray-300 hover:border-[#3aba90]'
                                    }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    name="photoFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="text-center">
                                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-600">
                                        {form.photoFile ? form.photoFile.name : 'Drop photo here or click to upload'}
                                    </p>
                                    <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Adding Patient...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <UserPlus2 className="w-4 h-4" />
                                        <span>Add Patient</span>
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPatientModal
