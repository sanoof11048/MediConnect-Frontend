import React from 'react';
import { Users, Clock, Award, DollarSign, ArrowRight } from 'lucide-react';
import LazyImage from './lazyImages/LazyImage';
import { CareerImage } from '../assets/ImageAssets';

const Careers: React.FC = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages',
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: '24/7 care with flexible shift options',
    },
    {
      icon: Award,
      title: 'Professional Growth',
      description: 'Continuous learning and development opportunities',
    },
    {
      icon: Users,
      title: 'Supportive Team',
      description: 'Collaborative and inclusive work environment',
    },
  ];

  const qualifications = [
    'Licensed Registered Nurse (RN) or equivalent certification',
    'Minimum 2 years of clinical experience',
    'Experience in home healthcare or acute care settings',
    'Strong communication and interpersonal skills',
    'Compassionate approach to patient care',
    'Ability to work independently and make clinical decisions',
  ];

  return (
    <section id="careers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our <span className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] bg-clip-text text-transparent">Healthcare Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make a difference in patients' lives while advancing your career. We're looking for passionate healthcare professionals to join our growing team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-stretch">
          {/* Benefits & Qualifications */}
          <div className="space-y-12 flex flex-col justify-between h-full">
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Why Choose MediConnect?</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Required Qualifications</h3>
              <ul className="space-y-3">
                {qualifications.map((qualification, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#3aba90] rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{qualification}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">Ready to Make a Difference?</h3>
              <p className="mb-6 opacity-90">
                Join our team of dedicated healthcare professionals and help us provide exceptional care to patients in their homes.
              </p>
              <button className="bg-white text-[#1a98cd] px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center group">
                <span>Join Our Team</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>


          {/* Image Section */}

          <div className="relative w-full h-full">
            <div className="relative overflow-hidden h-full rounded-2xl  ">
              {/* Lazy Loaded Background Image */}
              <LazyImage
                src={CareerImage}
                alt="Healthcare professionals working together"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />

              {/* Text Content */}
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Join 200+ Healthcare Professionals
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Be part of a team that's transforming healthcare delivery and improving patient outcomes every day.
                  </p>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  );
};

export default Careers;