import React from 'react';
import { Brain, Activity, Settings as Lungs, Heart, Shield, UserCheck } from 'lucide-react';
import { CancerService, ElderlyCare, Neurological, Physiotherapy, PostOperative, Tracheostomy } from '../assets/ImageAssets';
import LazyImage from './lazyImages/LazyImage';


const Services: React.FC = () => {
  const services = [
    {
      icon: Brain,
      title: 'Neurological Care',
      description: 'Specialized care for patients with neurological conditions, including stroke recovery, spinal cord injuries, and brain trauma rehabilitation.',
      image: Neurological
    },
    {
      icon: Activity,
      title: 'Home Physiotherapy',
      description: 'Professional physiotherapy services in your home to improve mobility, strength, and overall physical function.',
      image: Physiotherapy
    },
    {
      icon: Lungs,
      title: 'Tracheostomy Care',
      description: 'Expert tracheostomy care and monitoring, ensuring proper airway management and respiratory support.',
      image: Tracheostomy
    },
    {
      icon: Heart,
      title: 'Elderly Medical Care',
      description: 'Comprehensive healthcare services tailored for elderly patients, focusing on comfort and dignity.',
      image: ElderlyCare
    //   image: 'https://images.pexels.com/photos/7195742/pexels-photo-7195742.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      icon: Shield,
      title: 'Cancer Care',
      description: 'Supportive care for cancer patients, including pain management, medication administration, and emotional support.',
      image: CancerService
      //   image: 'https://images.pexels.com/photos/7195771/pexels-photo-7195771.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      icon: UserCheck,
      title: 'Post Operative Care',
      description: 'Specialized post-surgical care to ensure proper healing and recovery in the comfort of your home.',
      image: PostOperative
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] bg-clip-text text-transparent">Healthcare Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive healthcare services designed to meet your specific needs, delivered by our team of experienced professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#1a98cd]/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <LazyImage
                    src={service.image}
                    alt={service.title}
                    className=" object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#1a98cd]" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#1a98cd] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4">
                    <button className="text-[#1a98cd] hover:text-[#3aba90] font-medium transition-colors inline-flex items-center">
                      Learn more
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;