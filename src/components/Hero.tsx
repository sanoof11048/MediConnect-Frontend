import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import heroImage from '../assets/illustrations/HeroImage.jpg'
import NurseProfile from '../assets/illustrations/NurseProfile.jpeg'
// import TimeImage from '../assets/illustrations/24X7.jpeg'

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Helping You{' '}
                <span className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] bg-clip-text text-transparent">
                  Heal at Home
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Experience hospital-quality care in the comfort of your home. Our skilled healthcare professionals provide 24/7 advanced nursing care, helping you recover faster in a familiar environment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                <span className="font-semibold">Book Consultation</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-[#1a98cd] text-[#1a98cd] px-8 py-4 rounded-full hover:bg-[#1a98cd] hover:text-white transition-all duration-300 flex items-center justify-center">
                <Phone className="mr-2 w-5 h-5" />
                <span className="font-semibold">Call Now</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1a98cd]">24/7</div>
                <div className="text-sm text-gray-600">Care Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3aba90]">500+</div>
                <div className="text-sm text-gray-600">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1a98cd]">98%</div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
              src={heroImage}
                // src="https://images.pexels.com/photos/7195746/pexels-photo-7195746.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional nurse providing home healthcare"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -left-6 top-20 bg-white rounded-xl shadow-lg p-4 max-w-xs hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Online 24/7</div>
                  <div className="text-sm text-gray-600">Always available</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-20 bg-white rounded-xl shadow-lg p-4 max-w-xs hidden lg:block">
              <div className="flex items-center space-x-3">
                <img
                src={NurseProfile}
                //   src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Healthcare professional"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-800">Expert Care</div>
                  <div className="text-sm text-gray-600">Certified professionals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;