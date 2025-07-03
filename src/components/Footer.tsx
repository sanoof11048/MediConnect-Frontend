import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">MediConnect</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Providing 24/7 advanced nursing home care with hospital-quality services in the comfort of your home.
            </p>
            <div className="flex space-x-4 items-center justify-center">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1a98cd] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1a98cd] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1a98cd] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#1a98cd] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-300 hover:text-[#3aba90] transition-colors">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-[#3aba90] transition-colors">Services</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-[#3aba90] transition-colors">About</a></li>
              <li><a href="#careers" className="text-gray-300 hover:text-[#3aba90] transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Neurological Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Home Physiotherapy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Tracheostomy Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Elderly Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Cancer Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#3aba90] transition-colors">Post Operative Care</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='text-center'>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#3aba90]" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#3aba90]" />
                <span className="text-gray-300">info@mediconnect.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#3aba90] mt-1" />
                <span className="text-gray-300">123 Healthcare Avenue<br />Medical District, NY 10001</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Emergency Contact</h4>
              <p className="text-[#3aba90] font-semibold text-lg">+1 (555) 911-CARE</p>
              <p className="text-gray-400 text-sm">Available 24/7</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MediConnect. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Licensed Healthcare Provider | Accredited by Joint Commission
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;