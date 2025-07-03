import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, X, Upload } from 'lucide-react';
import InputField from '../components/InputField';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../../../context/AuthContext';

interface SignUpFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    password: string;
    photoFile: File | null;
}

interface FormErrors {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    photoFile?: string;
}

const StandardSignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        photoFile: null
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const {signUp} = useAuth()

    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        else if (formData.fullName.length < 3) newErrors.fullName = 'Full name must be at least 3 characters';
        else if (formData.fullName.length > 50) newErrors.fullName = 'Full name must be less than 50 characters';

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === 'photoFile' && files && files.length > 0) {
            setFormData(prev => ({ ...prev, photoFile: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFormData(prev => ({ ...prev, photoFile: e.dataTransfer.files[0] }));
        }
    };

    const removePhoto = () => {
        setFormData(prev => ({ ...prev, photoFile: null }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please correct the form errors');
            return;
        }
        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('password', formData.password);
        if (formData.photoFile) formDataToSend.append('photoFile', formData.photoFile);

        setIsSubmitting(true);
    try {
      await signUp(formDataToSend);
      toast.success('Signup successful!');
    } catch {
        console.log("Some Issues Found")
    } finally {
      setIsSubmitting(false);
    }
    };

    return (
        <div className="min-h-screen max-h-full overflow-y-auto flex items-center justify-center bg-gray-50 relative px-4 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ background: '#3aba90', animationDelay: '2s' }}></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ background: '#1a97cd' }}></div>
            </div>

            <div className="md:max-h-screen max-h-full overflow-y-auto md:flex flex-col md:items-center md:justify-center mx-auto md:max-w-4xl w-full space-y-10">
                <div className="bg-white/90 w-full backdrop-blur-xl py-8 md:py-14 md:px-20 px-6 shadow-2xl rounded-lg md:flex-row flex-col flex justify-center items-center md:gap-12 my-10">
                    <div className="text-center flex flex-col md:w-4/12 w-full m-0 items-center justify-center">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-[#1a98cd] to-[#3aba90] rounded-full flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faUserPlus} size='2x' className='text-white' />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-600">Join us and get started today</p>
                        <div className="mt-4 hidden md:block">
                            <div className="flex items-center my-4">
                                <div className="flex-grow h-px bg-gray-300" />
                                <span className="mx-2 text-gray-500 text-sm">or</span>
                                <div className="flex-grow h-px bg-gray-300" />
                            </div>
                            <GoogleLoginButton divId="googleSignInDesktop" />
                        </div>
                        <div className="mt-2 text-center hidden sm:block">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button
                                    onClick={() => navigate('/login')}
                                    type="button"
                                    className="font-medium text-[#1a98cd] hover:text-[#3aba90] transition-colors duration-200">
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="md:space-y-6 space-y-4  m-0 w-full">
                        <div className='md:flex md:space-x-7 space-y-3'>

                            <InputField label="Full Name" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} error={errors.fullName} icon={<User className="h-5 w-5" />} required placeholder="Enter your full name" />

                            <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} required placeholder="Enter your email address" icon={<Mail className="h-5 w-5" />} />
                        </div>
                        <div className='md:flex md:space-x-7 space-y-3'>

                            <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} error={errors.phoneNumber} required placeholder="Enter your phone number" icon={<Phone className="h-5 w-5" />} />

                            <InputField label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} error={errors.password} required placeholder="Enter your password" icon={<Lock className="h-5 w-5" />} suffix={<button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600 ">{showPassword ? <EyeOff className="h-5 w-5 me-3" /> : <Eye className="h-5 w-5 me-3" />}</button>} />
                        </div>
                        {/* <label className="block text-sm font-semibold text-gray-700"> */}
                        <label className="block text-left text-xs font-semibold -mb-0 text-slate-600 tracking-wide">

                            Profile Photo (Optional)
                        </label>
                        <div
                            className={`relative border-2 border-dashed rounded-xl md:p-2 p-6 text-center transition-all duration-200 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {formData.photoFile ? (
                                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-sm text-green-800 font-medium truncate">
                                            {formData.photoFile.name}
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600 mb-2">
                                        Drag & drop your photo here, or click to browse
                                    </p>
                                    <input
                                        type="file"
                                        name="photoFile"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Enhanced Terms Checkbox */}
                        <label htmlFor="terms" className="flex items-start gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-sm">
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                className="sr-only peer"
                            />
                            <div className="w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded-md peer-checked:bg-[#1a98cd] peer-checked:border-[#1a98cd] transition-all duration-200">
                                <svg
                                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed select-none">
                                I agree to the{' '}
                                <a
                                    href="#"
                                    className="text-[#1a98cd] hover:text-[#3aba90] font-medium underline-offset-2 hover:underline transition-colors duration-200"
                                >
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a
                                    href="#"
                                    className="text-[#1a98cd] hover:text-[#3aba90] font-medium underline-offset-2 hover:underline transition-colors duration-200"
                                >
                                    Privacy Policy
                                </a>
                            </span>
                        </label>


                        <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white md:mt-0 mt-4 py-2 px-4 rounded-md font-medium text-lg hover:from-[#1586b8] hover:to-[#2ea080] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a98cd] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                            {isSubmitting ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="block md:hidden pb-[env(safe-area-inset-bottom)] sm:pb-0">
                        <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-300" />
                            <span className="mx-2 text-gray-500 text-sm">or</span>
                            <div className="flex-grow h-px bg-gray-300" />
                        </div>
                        <GoogleLoginButton divId="googleSignInMobile" />
                    </div>


                    <div className="mt-4 text-center md:hidden">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                type="button"
                                className="font-medium text-[#1a98cd] hover:text-[#3aba90] transition-colors duration-200">
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StandardSignUp;
