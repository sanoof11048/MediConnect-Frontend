import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navigate = useNavigate()
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Careers', href: '#careers' },
    ];

    return (
        <header className={`fixed left-10 right-10 z-50 rounded-2xl shadow-2xl transition-all duration-300 ${isScrolled ? 'bg-white/80 shadow-lg top-2' : 'bg-white/90 backdrop-blur-sm top-7'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-lg flex items-center justify-center">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">MediConnect</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-gray-600 hover:text-[#1a98cd] transition-colors duration-200 font-medium"
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate('/login')}

                                className="text-[#1a98cd] hover:text-[#3aba90] transition-colors duration-200 font-medium">
                                Login
                            </button>
                            <button

                                onClick={() => navigate('/signup')}
                                className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-medium">
                                Sign Up
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-600" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-600" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-gray-600 hover:text-[#1a98cd] transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="flex flex-col space-y-2 px-3 pt-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-[#1a98cd] hover:text-[#3aba90] transition-colors duration-200">

                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200 w-full">

                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;