import React, { useState, useEffect } from 'react';
import { Heart, Shield, Users, Clock, Star, Phone, Mail, MapPin, ChevronRight, Play, CheckCircle, Award, Stethoscope, Home, Activity } from 'lucide-react';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { 
      icon: <Activity className="w-8 h-8" />, 
      title: "Neurological Care", 
      description: "Specialized care for neurological conditions with advanced monitoring and rehabilitation support.",
      features: ["24/7 Monitoring", "Rehabilitation Support", "Medication Management"]
    },
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Home Physiotherapy", 
      description: "Professional physiotherapy sessions in your home with personalized treatment plans.",
      features: ["Personalized Plans", "Modern Equipment", "Progress Tracking"]
    },
    { 
      icon: <Stethoscope className="w-8 h-8" />, 
      title: "Tracheostomy Care", 
      description: "Expert tracheostomy care with proper hygiene maintenance and emergency support.",
      features: ["Expert Care", "Emergency Support", "Family Training"]
    },
    { 
      icon: <Heart className="w-8 h-8" />, 
      title: "Elderly Medical Care", 
      description: "Comprehensive healthcare for seniors with focus on comfort and dignity.",
      features: ["Comprehensive Care", "Dignity Focus", "Family Support"]
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Cancer Care", 
      description: "Compassionate cancer care support with pain management and emotional support.",
      features: ["Pain Management", "Emotional Support", "Family Counseling"]
    },
    { 
      icon: <Home className="w-8 h-8" />, 
      title: "Post Operative Care", 
      description: "Complete post-surgery care ensuring smooth recovery in familiar surroundings.",
      features: ["Wound Care", "Recovery Monitoring", "Medication Support"]
    }
  ];

  const stats = [
    { number: "10,000+", label: "Patients Served", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Qualified Nurses", icon: <Stethoscope className="w-6 h-6" /> },
    { number: "24/7", label: "Care Available", icon: <Clock className="w-6 h-6" /> },
    { number: "98%", label: "Satisfaction Rate", icon: <Star className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Daughter of Patient",
      content: "MediConnect provided exceptional care for my mother. The nurses were professional, caring, and made her feel comfortable at home.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Family Physician",
      content: "I regularly refer patients to MediConnect. Their level of care and professionalism is outstanding.",
      rating: 5
    },
    {
      name: "Robert Williams",
      role: "Cancer Patient",
      content: "The cancer care team helped me through the most difficult time of my life with compassion and expertise.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Enhanced Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-xl transition-colors ${
                isScrolled ? 'bg-gradient-to-r from-[#1a98cd] to-[#3aba90]' : 'bg-white/20'
              }`}>
                <Heart className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-white'}`} />
              </div>
              <h1 className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>MediConnect</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {['Services', 'About', 'Careers', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className={`font-medium transition-colors hover:scale-105 transform ${
                    isScrolled 
                      ? 'text-gray-700 hover:text-[#1a98cd]' 
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
              <div className="flex space-x-3">
                <a 
                  href="/login" 
                  className={`px-4 py-2 rounded-full transition-all hover:scale-105 ${
                    isScrolled 
                      ? 'text-[#1a98cd] border border-[#1a98cd] hover:bg-[#1a98cd] hover:text-white' 
                      : 'text-white border border-white/50 hover:bg-white hover:text-[#1a98cd]'
                  }`}
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  className="px-4 py-2 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-full hover:scale-105 transform transition-all shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a98cd] via-[#2ba3d4] to-[#3aba90] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90 font-medium">Trusted by 10,000+ families</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Healing at
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Home
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience hospital-level healthcare in the comfort of your home with our dedicated team of certified professionals providing 24/7 care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group px-8 py-4 bg-white text-[#1a98cd] rounded-full font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center space-x-2">
                <span>Get Started Today</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#1a98cd] transform hover:scale-105 transition-all flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/30 transition-all">
                  <div className="flex justify-center mb-2 text-white">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#1a98cd]/10 rounded-full px-4 py-2 mb-4">
              <Stethoscope className="w-5 h-5 text-[#1a98cd]" />
              <span className="text-[#1a98cd] font-medium">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Comprehensive Care
              <span className="block text-[#1a98cd]">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From specialized medical care to daily assistance, we provide a full spectrum of healthcare services tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-[#1a98cd]/20"
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-xl group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 ml-4">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3aba90]" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-xl font-bold hover:shadow-lg transition-all group-hover:scale-105">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#1a98cd]/10 rounded-full px-4 py-2 mb-6">
                <Award className="w-5 h-5 text-[#1a98cd]" />
                <span className="text-[#1a98cd] font-medium">Why Choose Us</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Healthcare That
                <span className="block text-[#1a98cd]">Comes to You</span>
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We bridge the gap between hospital-quality care and the comfort of home. Our mission is to provide exceptional healthcare services that prioritize your well-being and peace of mind.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Clock className="w-6 h-6" />, title: "24/7 Availability", desc: "Round-the-clock care when you need it most" },
                  { icon: <Shield className="w-6 h-6" />, title: "Certified Professionals", desc: "Licensed and experienced healthcare experts" },
                  { icon: <Heart className="w-6 h-6" />, title: "Personalized Care", desc: "Tailored treatment plans for every individual" },
                  { icon: <Home className="w-6 h-6" />, title: "Home Comfort", desc: "Familiar environment promotes faster healing" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="px-8 py-4 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Discover Our Approach
              </button>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Promise</h3>
                <div className="space-y-4">
                  {[
                    "Hospital-level care in your home environment",
                    "Skilled and certified nursing professionals",
                    "Personalized treatment and care plans",
                    "Compassionate and empathetic approach",
                    "Family-centered care coordination",
                    "Advanced medical equipment and monitoring"
                  ].map((promise, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#3aba90] flex-shrink-0" />
                      <span className="text-gray-700">{promise}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-[#3aba90] to-[#1a98cd] rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-[#1a98cd]/10 rounded-full px-4 py-2 mb-4">
              <Star className="w-5 h-5 text-[#1a98cd]" />
              <span className="text-[#1a98cd] font-medium">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What Our
              <span className="block text-[#1a98cd]">Patients Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-[#1a98cd] font-medium">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Careers Section */}
      <section id="careers" className="py-20 px-4 bg-gradient-to-r from-[#1a98cd] to-[#3aba90]">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Mission of
              <span className="block">Compassionate Care</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Be part of a team that's revolutionizing home healthcare. We're looking for passionate professionals who believe in making a difference in people's lives.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: "Competitive Benefits", desc: "Comprehensive healthcare and retirement plans" },
                { title: "Professional Growth", desc: "Continuous learning and advancement opportunities" },
                { title: "Meaningful Work", desc: "Make a real difference in patients' lives daily" }
              ].map((benefit, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold text-white text-lg mb-2">{benefit.title}</h4>
                  <p className="text-white/80">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">We're Looking For:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {[
                  "Registered Nurses (5+ years experience)",
                  "Licensed Practical Nurses",
                  "Physical Therapists",
                  "Occupational Therapists",
                  "Home Health Aides",
                  "Medical Social Workers"
                ].map((role, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-white">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="px-8 py-4 bg-white text-[#1a98cd] rounded-full font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl">
              Apply Now - Join Our Team
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to experience the difference of professional home healthcare? Contact us today for a consultation.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Phone className="w-6 h-6" />, title: "Call Us", info: "+1 (555) 123-4567" },
                  { icon: <Mail className="w-6 h-6" />, title: "Email Us", info: "info@mediconnect.com" },
                  { icon: <MapPin className="w-6 h-6" />, title: "Visit Us", info: "123 Healthcare Ave, Medical District" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-lg">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{contact.title}</h4>
                      <p className="text-gray-300">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-[#1a98cd] focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-[#1a98cd] focus:outline-none"
                  />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-[#1a98cd] focus:outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-[#1a98cd] focus:outline-none"
                />
                <textarea 
                  placeholder="Tell us about your care needs..." 
                //   rows="4"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-[#1a98cd] focus:outline-none"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] text-white rounded-lg font-bold hover:shadow-lg transition-all"
                >
                  Schedule Consultation
                </button>
              </form>
            </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-[#1a98cd] to-[#3aba90] rounded-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">MediConnect</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Bringing hospital-quality healthcare to the comfort of your home with compassion and expertise.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">Neurological Care</a></li>
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">Home Physiotherapy</a></li>
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">Cancer Care</a></li>
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">Elderly Care</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[#1a98cd] transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Emergency Contact</h4>
              <p className="text-2xl font-bold text-[#1a98cd] mb-2">24/7 Hotline</p>
              <p className="text-xl text-gray-300">+1 (555) 911-CARE</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-300">
              &copy; {new Date().getFullYear()} MediConnect Private Limited. All rights reserved. 
              <span className="block mt-2 text-sm">Licensed Healthcare Provider | Accredited by Healthcare Quality Commission</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;