import React from 'react';
import { Shield, Heart, Award } from 'lucide-react';
import AboutImage from '../assets/illustrations/AboutImage.png'


const About: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust',
      description: 'Building lasting relationships through reliability, transparency, and consistent quality care.',
    },
    {
      icon: Heart,
      title: 'Empathy',
      description: 'Understanding and responding to each patient\'s unique needs with compassion and respect.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Maintaining the highest standards of medical care and continuous professional development.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About <span className="bg-gradient-to-r from-[#1a98cd] to-[#3aba90] bg-clip-text text-transparent">MediConnect</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  MediConnect is a group of technically competent, passionately motivated healthcare professionals dedicated to providing 24x7 Advanced Nursing Home Care. We believe that healing happens best in familiar surroundings.
                </p>
                <p>
                  Our mission is to bring hospital-quality medical care directly to your home, allowing patients to recover in comfort while receiving the skilled, professional attention they need. With our experienced team and state-of-the-art equipment, we create a safe, nurturing environment for optimal healing.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-[#1a98cd] mb-2">Our Mission</h3>
                <p className="text-gray-600 text-sm">
                  To deliver exceptional home healthcare services that promote healing, independence, and quality of life for every patient we serve.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-[#3aba90] mb-2">Our Vision</h3>
                <p className="text-gray-600 text-sm">
                  To be the leading provider of home healthcare, revolutionizing patient care through innovation, compassion, and excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={AboutImage}
                alt="Healthcare team providing compassionate care"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape our commitment to exceptional patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;