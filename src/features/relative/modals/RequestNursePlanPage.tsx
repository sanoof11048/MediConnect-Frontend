import { useEffect, useState } from "react";
import { useRelative } from "../../../context/RelativeContext";
import Loading from "../../../pages/Loading";
import axiosAuth from "../../../api/axiosAuth";
import { useNavigate } from "react-router-dom";

interface CarePlan {
  id: string;
  serviceType: string;
  fixedPayment: number;
  offerPrice: number;
  description: string;
  features: string[];
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition?: string;
  relationship: string;
}

const RequestNursePlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<CarePlan | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [startDate, setStartDate] = useState("");
  const [durationDays, setDurationDays] = useState(7);
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const today = new Date().toISOString().split('T')[0];
  const {carePlans, RelativeContextLoading, patients} = useRelative();
  const savings = selectedPlan ? selectedPlan.fixedPayment - selectedPlan.offerPrice : 0;
  const navigate = useNavigate();


  const handlePlanSelect = (plan: CarePlan) => {
    setSelectedPlan(plan);
    setTimeout(() => setStep(2), 300);
  };

const handleSubmit = async () => {
  if (!selectedPlan || !selectedPatient || !startDate || !durationDays) return;

  setIsSubmitting(true);

  try {
    const payload = {
      patientId: selectedPatient.id,
      startDate: new Date(startDate).toISOString(),
      durationDays: durationDays,
      requirements: requirements,
      careType: mapServiceTypeToEnum(selectedPlan.serviceType),
    };

    const response = await axiosAuth.post('/NurseRequest/create', payload);

    if (response.status === 200 || response.status === 201) {
      setIsSubmitting(false);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        console.log("Request submitted for patient:", selectedPatient.id);
        navigate("/relative")
      }, 2000);
    }
  } catch (error) {
    console.error('Error submitting nurse request:', error);
    alert("Something went wrong. Please try again.");
    setIsSubmitting(false);
  }
};
const mapServiceTypeToEnum = (serviceType: string): number => {
  const map: { [key: string]: number } = {
    TracheostomyCare: 0,
    HomePhysioTherapy: 1,
    CancerCare: 2,
    PostOperativeCare: 3,
    ElderlyMedicalCare: 4,
    NeurologicalCare: 5,
    PhysioTherapy: 6,

  };
  return map[serviceType] ?? 0; 
};

  // Function to format service type names for display
  const formatServiceType = (serviceType: string) => {
    return serviceType
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Function to get appropriate icon for each service type
  const getServiceIcon = (serviceType: string) => {
    const iconMap: { [key: string]: string } = {
      'TracheostomyCare': '🫁',
      'HomePhysioTherapy': '🏃‍♂️',
      'CancerCare': '💜',
      'PostOperativeCare': '🏥',
      'ElderlyMedicalCare': '👴',
      'NeurologicalCare': '🧠',
      'PhysioTherapy': '💪'
    };
    return iconMap[serviceType] || '🏥';
  };
  
  const totalCost = selectedPlan ? selectedPlan.offerPrice * durationDays : 0;

  if (RelativeContextLoading) {
    return <Loading/>;
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-4">Request Submitted Successfully!</h2>
          <p className="text-green-600 text-lg mb-2">Care plan requested for {selectedPatient?.name}</p>
          <p className="text-green-600">We'll match you with the perfect nurse shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="w-full mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Care Plan Selection
              </h1>
              <p className="text-gray-600">Choose the perfect care for your loved ones</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>1</div>
              <div className={`w-16 h-1 rounded transition-all duration-300 ${
                step >= 2 ? 'bg-blue-500' : 'bg-gray-200'
              }`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>2</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {step === 1 && (
          <div className="opacity-0 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Select Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Care Plan</span>
              </h2>
              <p className="text-xl text-gray-600">Professional healthcare tailored to your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {carePlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden opacity-0 translate-y-8 animate-[slideUp_0.8s_ease-out_forwards]`}
                  style={{animationDelay: `${index * 150}ms`}}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full -translate-y-16 translate-x-1 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{getServiceIcon(plan.serviceType)}</div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400 line-through">₹{plan.fixedPayment.toLocaleString()}</p>
                        <p className="text-2xl font-bold text-green-600">₹{plan.offerPrice.toLocaleString()}</p>
                        <p className="text-xs text-green-500 font-semibold">Save ₹{(plan.fixedPayment - plan.offerPrice).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                        {formatServiceType(plan.serviceType)}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="space-y-2 mb-6">
                      {plan.features.slice(0, 3).map((feature: any, idx: number) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                      Choose This Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedPlan && (
          <div className="opacity-0 translate-y-5 animate-[fadeInUp_0.6s_ease-out_forwards] max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Request Details</h2>
                    <p className="text-blue-100">Complete your care plan request</p>
                  </div>
                  <button 
                    onClick={() => setStep(1)}
                    className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">Selected Plan</h3>
                      <div className="space-y-3">
                        <p className="text-blue-800 font-medium">{formatServiceType(selectedPlan.serviceType)}</p>
                        <p className="text-blue-700">{selectedPlan.description}</p>
                        <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                          <span className="text-blue-600">Per day rate:</span>
                          <span className="text-2xl font-bold text-green-600">₹{selectedPlan.offerPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Patient Selection */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Select Patient <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-3">
                        {patients.map((patient) => (
                          <div
                            key={patient.id}
                            onClick={() => setSelectedPatient(patient)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              selectedPatient?.id === patient.id
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                patient.gender === 'Male' ? 'bg-blue-100' : 'bg-pink-100'
                              }`}>
                                <svg className={`w-6 h-6 ${
                                  patient.gender === 'Male' ? 'text-blue-600' : 'text-pink-600'
                                }`} fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-gray-800">{patient.fullName}</h4>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    selectedPatient?.id === patient.id
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-gray-200 text-gray-600'
                                  }`}>
                                    {patient.relationship}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {patient.age} years • {patient.gender}
                                </p>
                                {patient.condition && (
                                  <p className="text-sm text-blue-600 font-medium mt-1">
                                    {patient.condition}
                                  </p>
                                )}
                              </div>
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                selectedPatient?.id === patient.id
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {selectedPatient?.id === patient.id && (
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                        value={startDate}
                        min={today}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Duration (Days) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="30"
                          value={durationDays}
                          onChange={(e) => setDurationDays(parseInt(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 
                                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r 
                                   [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-500 
                                   [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
                                   [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full 
                                   [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-blue-500 
                                   [&::-moz-range-thumb]:to-purple-500 [&::-moz-range-thumb]:cursor-pointer 
                                   [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-lg"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>1 day</span>
                          <span className="text-xl font-bold text-blue-600">{durationDays} days</span>
                          <span>30 days</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-semibold text-gray-800 mb-3">
                        Special Requirements (Optional)
                      </label>
                      <textarea
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 h-32 resize-none"
                        placeholder="Any specific care requirements, medical conditions, or preferences..."
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}
                        maxLength={300}
                      />
                      <p className="text-sm text-gray-500 mt-2">{requirements.length}/300 characters</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <h3 className="text-xl font-semibold text-green-900 mb-6">Cost Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-green-700">Patient:</span>
                          <span className="font-semibold">{selectedPatient?.name || 'Not selected'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Duration:</span>
                          <span className="font-semibold">{durationDays} days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">Rate per day:</span>
                          <span className="font-semibold">₹{selectedPlan.offerPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700">You save:</span>
                          <span className="font-semibold text-green-600">₹{(savings * durationDays).toLocaleString()}</span>
                        </div>
                        <div className="border-t border-green-200 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-green-900">Total Cost:</span>
                            <span className="text-3xl font-bold text-green-600">₹{totalCost.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-300"
                  >
                    Back to Plans
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!startDate || !selectedPatient || isSubmitting}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      !startDate || !selectedPatient || isSubmitting
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </span>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom animations using Tailwind */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default RequestNursePlanPage;