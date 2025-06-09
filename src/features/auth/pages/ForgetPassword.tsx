import { useState, useEffect } from 'react';
import { Mail, ArrowLeft, ArrowRight, Shield, Check, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosAuth from '../../../api/axiosAuth';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  // Timer for resend OTP
  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleEmailSubmit = async () => {
    if (!email) return;

    setIsLoading(true);

    try {
      await toast.promise(
        axiosAuth.post(`/Auth/send-otp?email=${encodeURIComponent(email)}`),
        {
          loading: 'Sending OTP...',
          success: (res) => {
            if (res.data.success) {
              setStep(2);
              setTimer(60);
              setCanResend(false);
              return res.data.message || 'OTP sent successfully';
            } else {
              // This case is usually handled as error response, but just in case:
              throw new Error(res.data.message || 'Failed to send OTP');
            }
          },
          error: (err) => {
            // err here is axios error object
            return err?.response?.data?.error || err?.response?.data?.message || 'Failed to send OTP';
          }
        }
      );
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Something went wrong while sending OTP.');
    } finally {
      setIsLoading(false);
    }
  };




  const handleOtpChange = (index: any, value: any) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: any, e: any) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;

    setIsLoading(true);

    try {
      await toast.promise(
        axiosAuth.post(`/Auth/verify-otp`, {
          email: email,
          otp: otpString
        }),
        {
          loading: 'Verifying...',
          success: 'OTP verified!',
          error: 'Invalid OTP or expired',
        }
      ).then((res) => {
        if (res.data.success) {
          setStep(3);
          toast.success(res.data.message || 'OTP verified successfully');
        } else {
          toast.error(res.data.message || 'Invalid OTP or expired');
        }
        console.log(res.data.message);
      });
    } catch (err: any) {
      console.error(err.response.data.message || 'Error verifying OTP:', err);
      toast.error(err.response.data.message || 'Error verifying OTP');
      // toast.error('Something went wrong while verifying OTP.');
    } finally {
      setIsLoading(false);
    }
  };


  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
      toast.error("Passwords are required and must match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosAuth.post(
        '/Auth/reset-password',
        {
          email,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setStep(4);
        toast.success(res.data.message || 'Password reset successfully');
      } else {
        toast.error(res.data.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while resetting password.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleResendOtp = () => {
    setCanResend(false);
    handleEmailSubmit();
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    // Simulate resend API call
    setTimeout(() => {
      console.log('OTP resent');
    }, 500);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthLevels = [
      { text: 'Very Weak', color: '#ef4444' },
      { text: 'Weak', color: '#f97316' },
      { text: 'Fair', color: '#eab308' },
      { text: 'Good', color: '#22c55e' },
      { text: 'Strong', color: '#16a34a' }
    ];

    return { strength, ...strengthLevels[Math.min(strength, 4)] };
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ background: '#1a97cd' }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ background: '#3aba90', animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">

          {/* Back Button */}
          {step < 4 && (
            <button
              onClick={step === 1 ? goToLogin : goBack}
              className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-sm">{step === 1 ? 'Back to Login' : 'Back'}</span>
            </button>
          )}

          {step === 1 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}>
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                <p className="text-gray-600">Enter your email to receive a verification code</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none rounded-xl focus:ring-2 focus:ring-[#1a97cd] focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <button
                  onClick={handleEmailSubmit}
                  disabled={!email || isLoading}
                  className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                  style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Enter Verification Code</h1>
                <p className="text-gray-600 mb-1">We sent a 6-digit code to</p>
                <p className="font-medium" style={{ color: '#1a97cd' }}>{email}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Verification Code</label>
                  <div className="flex space-x-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg focus:outline-none font-semibold border-2 border-gray-300 rounded-xl focus:border-transparent focus:ring-2 focus:ring-[#1a97cd] transition-all bg-gray-50/50"
                      />
                    ))}
                  </div>
                </div>

                {/* Timer and Resend */}
                <div className="text-center">
                  {!canResend ? (
                    <p className="text-sm text-gray-600">
                      Resend code in <span className="font-medium" style={{ color: '#1a97cd' }}>{timer}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      className="text-sm font-medium hover:underline inline-flex items-center"
                      style={{ color: '#1a97cd' }}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Resend Code
                    </button>
                  )}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.join('').length !== 6 || isLoading}
                  className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                  style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Verify Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}>
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Password</h1>
                <p className="text-gray-600">Enter a strong password for your account</p>
              </div>

              <div className="space-y-6">
                {/* New Password */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                    <Lock className="w-4 h-4 mr-2" />
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border focus:outline-none border-gray-300 rounded-xl focus:ring-2 focus:ring-[#1a97cd] focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Password Strength</span>
                        <span style={{ color: passwordStrength.color }}>{passwordStrength.text}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(passwordStrength.strength / 5) * 100}%`,
                            backgroundColor: passwordStrength.color
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-sm font-medium text-gray-700 flex items-center mb-2">
                    <Lock className="w-4 h-4 mr-2" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 focus:outline-none rounded-xl focus:ring-2 focus:ring-[#1a97cd] focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Match Indicator */}
                  {confirmPassword && (
                    <div className="mt-2 flex items-center text-xs">
                      {passwordsMatch ? (
                        <span className="text-green-600 flex items-center">
                          <Check className="w-3 h-3 mr-1" />
                          Passwords match
                        </span>
                      ) : (
                        <span className="text-red-600">Passwords don't match</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
                  <div className="space-y-1 text-xs">
                    <div className={`flex items-center ${newPassword.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${newPassword.length >= 8 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                      At least 8 characters
                    </div>
                    <div className={`flex items-center ${/[A-Z]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[A-Z]/.test(newPassword) ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                      One uppercase letter
                    </div>
                    <div className={`flex items-center ${/[0-9]/.test(newPassword) ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${/[0-9]/.test(newPassword) ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                      One number
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePasswordReset}
                  disabled={!newPassword || !confirmPassword || !passwordsMatch || passwordStrength.strength < 3 || isLoading}
                  className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                  style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Reset Password</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}>
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h1>
                <p className="text-gray-600">Your password has been updated successfully</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border-2 border-dashed" style={{ borderColor: '#3aba90', backgroundColor: '#3aba9010' }}>
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 mt-0.5" style={{ color: '#3aba90' }} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">All set!</p>
                      <p className="text-xs text-gray-600 mt-1">
                        You can now sign in with your new password. Keep it safe and secure.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={goToLogin}
                  className="w-full text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #1a97cd, #3aba90)' }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            </>
          )}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium" style={{ background: 'linear-gradient(135deg, #1a97cd15, #3aba9015)', color: '#1a97cd' }}>
              🔒 Secure Password Recovery
            </div>
            <p className="text-xs text-gray-500 mt-4">© 2025 MediConnect - Healthcare Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}