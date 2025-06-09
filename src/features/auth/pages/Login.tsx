import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, Heart, Mail, Lock, ArrowRight } from 'lucide-react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function MediConnectLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            await toast.promise(
                login(values.email, values.password),
                {
                    loading: 'Logging in...',
                    success: 'Login successful!',
                    error: 'Incorrect email or password. Please try again.',
                }
            );
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="md:max-h-screen min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ background: '#1a97cd' }}></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ background: '#3aba90', animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 w-full md:max-w-xl sm:scale-100 md:scale-80 scale-95">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8">
                    {/* Branding */}
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mb-3 sm:mb-4" style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}>
                            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">MediConnect</h1>
                        <p className="text-gray-600 text-sm sm:text-base">Healthcare Coordination Platform</p>
                    </div>

                    {/* Google Login */}
                    <GoogleLoginButton divId="googleSignInDesktop" />

                    {/* Divider */}
                    <div className="relative my-5 sm:my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white text-gray-500">or continue with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form className="space-y-5">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-3 focus:ring-[#1a97cd] border border-gray-300 rounded-xl focus:ring-2 focus:outline-none focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                                        placeholder="your@email.com"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                                        <Lock className="w-4 h-4 mr-2" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Field
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a97cd] focus:outline-none focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300 shadow-sm" style={{ accentColor: '#1a97cd' }} />
                                        <span className="ml-2 text-gray-600">Remember me</span>
                                    </label>
                                    <a href="/forget" className="font-medium hover:underline text-[#1a97cd]">
                                        Forgot password?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                                    style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Don’t have an account?{' '}
                            <a href="/signup" className="font-semibold text-[#1a97cd] hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>

                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>© 2025 MediConnect - Secure Platform</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
