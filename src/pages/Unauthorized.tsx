import { useState, useEffect } from 'react';
import { Shield, Lock, Home, LogIn, ArrowLeft, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(8);
    const [glitchActive, setGlitchActive] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number, x: number, y: number, delay: number }>>([]);

    useEffect(() => {
        // Create floating particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3
        }));
        setParticles(newParticles);

        // Glitch effect
        const glitchInterval = setInterval(() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 150);
        }, 3000);

        // Countdown timer
        const timer = setInterval(() => {
            // setCountdown(prev => prev > 0 ? prev - 1 : 0);
            setCountdown(prev => {
            if (prev <= 1) {
                clearInterval(timer);  
                navigate('/');    
                return 0;
            }
            return prev - 1;
        });
        }, 1000);

        return () => {
            clearInterval(glitchInterval);
            clearInterval(timer);
        };
    }, []);

    return (
        <div className=" p-0 m-0 max-h-screen  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]"></div>
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,0,150,0.1)_60deg,transparent_120deg)] animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>

            {/* Floating Particles */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-pulse"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: '3s'
                    }}
                ></div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="max-w-lg w-full">
                    {/* Glitch Effect Wrapper */}
                    <div className={`transition-all duration-150 ${glitchActive ? 'transform translate-x-1 skew-x-1' : ''}`}>

                        {/* Main Card */}
                        <div className="bg-black/40 sm:scale-100 md:scale-75 scale-95 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-8 shadow-2xl shadow-purple-500/20">

                            {/* Icon Section */}
                            <div className="text-center mb-8">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-red-500 blur-2xl opacity-50 animate-pulse"></div>
                                    <div className="relative bg-gradient-to-r from-red-500 to-pink-500 w-24 h-24 rounded-2xl mx-auto flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                        <Shield className="w-12 h-12 text-white" />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h1 className={`text-4xl font-black bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 ${glitchActive ? 'animate-pulse' : ''}`}>
                                        ACCESS DENIED
                                    </h1>
                                    <p className="text-gray-300 text-lg">
                                        You've entered a <span className="text-cyan-400 font-semibold">restricted zone</span>
                                    </p>
                                </div>
                            </div>

                            {/* Security Alert */}
                            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-6 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <Lock className="w-5 h-5 text-red-400" />
                                    <span className="text-red-400 font-semibold">Security Alert</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    This area is protected by advanced security protocols.
                                    <span className="block mt-1 text-cyan-400">Authorization required to proceed.</span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-4 mb-6">
                                <button
                                    onClick={() => navigate('/login')} // 🔹 Navigate to login or auth
                                    className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-3"
                                >
                                    <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    <span>Authenticate Access</span>
                                    <div className="absolute sm:scale-100 md:scale-75 scale-95 inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => navigate('/')} // 🔹 Home
                                        className="bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2"
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Home</span>
                                    </button>

                                    <button
                                        onClick={() => navigate(-1)} // 🔹 Go back one step
                                        className="bg-slate-800/50 hover:bg-slate-700/50 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>Back</span>
                                    </button>
                                </div>
                            </div>

                            {/* Countdown Section */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-full border border-orange-500/30">
                                    <Zap className="w-4 h-4 text-orange-400 animate-pulse" />
                                    <span className="text-gray-300 text-sm">
                                        Auto-redirect in <span className="font-bold text-orange-400 text-lg mx-1">{countdown}</span> seconds
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-br-full"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-tl-full"></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
        </div>
    );
};

export default Unauthorized;