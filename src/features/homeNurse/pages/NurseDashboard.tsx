<<<<<<< HEAD
import { useState } from 'react';
import { Plus, Users, Briefcase, Activity, Pill, Utensils, Calendar, Clock, MapPin, DollarSign, Edit, Trash2, Save, X } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  contact: string;
  address: string;
  emergencyContact: string;
}

interface JobOpportunity {
  id: string;
  patientName: string;
  location: string;
  duration: string;
  payRate: number;
  requirements: string[];
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Applied' | 'In Progress' | 'Completed';
}

interface Vital {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  notes: string;
}

interface Medication {
  id: string;
  patientId: string;
  patientName: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  administeredAt: string;
  administeredBy: string;
  notes: string;
}

interface FoodLog {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  foodItems: string;
  calories: number;
  waterIntake: number;
  dietaryRestrictions: string;
  notes: string;
}

type ActiveTab = 'patients' | 'jobs' | 'vitals' | 'medications' | 'food';

export default function HomeNurseDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('patients');
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      age: 72,
      gender: 'Male',
      condition: 'Diabetes, Hypertension',
      contact: '+1-555-0123',
      address: '123 Oak Street, Springfield',
      emergencyContact: '+1-555-0124'
    },
    {
      id: '2',
      name: 'Mary Johnson',
      age: 68,
      gender: 'Female',
      condition: 'Post-surgical care',
      contact: '+1-555-0125',
      address: '456 Pine Avenue, Springfield',
      emergencyContact: '+1-555-0126'
    }
  ]);

  const [jobs, setJobs] = useState<JobOpportunity[]>([
    {
      id: '1',
      patientName: 'Robert Wilson',
      location: 'Downtown Medical District',
      duration: '8 hours/day, 5 days/week',
      payRate: 35,
      requirements: ['RN License', 'CPR Certified', '2+ years experience'],
      urgency: 'High',
      status: 'Open'
    },
    {
      id: '2',
      patientName: 'Elena Rodriguez',
      location: 'Suburban Care Center',
      duration: '12 hours/day, 3 days/week',
      payRate: 40,
      requirements: ['LPN License', 'Medication Management', 'Wound Care'],
      urgency: 'Medium',
      status: 'Applied'
    }
  ]);

  const [vitals, setVitals] = useState<Vital[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      date: '2025-06-09',
      time: '08:30',
      bloodPressure: '140/90',
      heartRate: 75,
      temperature: 98.6,
      oxygenSaturation: 96,
      notes: 'Stable readings, slight elevation in BP'
    }
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      medicationName: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2025-06-01',
      endDate: '2025-08-01',
      administeredAt: '2025-06-09 08:00',
      administeredBy: 'Nurse Sarah',
      notes: 'Take with meals'
    }
  ]);

  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      date: '2025-06-09',
      mealType: 'Breakfast',
      foodItems: 'Oatmeal, banana, orange juice',
      calories: 320,
      waterIntake: 8,
      dietaryRestrictions: 'Low sodium, diabetic diet',
      notes: 'Patient ate well, blood sugar checked before meal'
    }
  ]);

  // Form states
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showVitalForm, setShowVitalForm] = useState(false);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [showFoodForm, setShowFoodForm] = useState(false);

  // Form data states
  const [patientForm, setPatientForm] = useState<Partial<Patient>>({});
  const [jobForm, setJobForm] = useState<Partial<JobOpportunity>>({});
  const [vitalForm, setVitalForm] = useState<Partial<Vital>>({});
  const [medicationForm, setMedicationForm] = useState<Partial<Medication>>({});
  const [foodForm, setFoodForm] = useState<Partial<FoodLog>>({});

  // Add functions
  const addPatient = () => {
    if (patientForm.name && patientForm.age && patientForm.gender) {
      const newPatient: Patient = {
        id: Date.now().toString(),
        name: patientForm.name,
        age: patientForm.age,
        gender: patientForm.gender,
        condition: patientForm.condition || '',
        contact: patientForm.contact || '',
        address: patientForm.address || '',
        emergencyContact: patientForm.emergencyContact || ''
      };
      setPatients([...patients, newPatient]);
      setPatientForm({});
      setShowPatientForm(false);
    }
  };

  const addJob = () => {
    if (jobForm.patientName && jobForm.location && jobForm.payRate) {
      const newJob: JobOpportunity = {
        id: Date.now().toString(),
        patientName: jobForm.patientName,
        location: jobForm.location,
        duration: jobForm.duration || '',
        payRate: jobForm.payRate,
        requirements: jobForm.requirements || [],
        urgency: jobForm.urgency || 'Medium',
        status: jobForm.status || 'Open'
      };
      setJobs([...jobs, newJob]);
      setJobForm({});
      setShowJobForm(false);
    }
  };

  const addVital = () => {
    if (vitalForm.patientName && vitalForm.date && vitalForm.time) {
      const newVital: Vital = {
        id: Date.now().toString(),
        patientId: vitalForm.patientId || '',
        patientName: vitalForm.patientName,
        date: vitalForm.date,
        time: vitalForm.time,
        bloodPressure: vitalForm.bloodPressure || '',
        heartRate: vitalForm.heartRate || 0,
        temperature: vitalForm.temperature || 0,
        oxygenSaturation: vitalForm.oxygenSaturation || 0,
        notes: vitalForm.notes || ''
      };
      setVitals([...vitals, newVital]);
      setVitalForm({});
      setShowVitalForm(false);
    }
  };

  const addMedication = () => {
    if (medicationForm.patientName && medicationForm.medicationName) {
      const newMedication: Medication = {
        id: Date.now().toString(),
        patientId: medicationForm.patientId || '',
        patientName: medicationForm.patientName,
        medicationName: medicationForm.medicationName,
        dosage: medicationForm.dosage || '',
        frequency: medicationForm.frequency || '',
        startDate: medicationForm.startDate || '',
        endDate: medicationForm.endDate || '',
        administeredAt: medicationForm.administeredAt || '',
        administeredBy: medicationForm.administeredBy || '',
        notes: medicationForm.notes || ''
      };
      setMedications([...medications, newMedication]);
      setMedicationForm({});
      setShowMedicationForm(false);
    }
  };

  const addFood = () => {
    if (foodForm.patientName && foodForm.date && foodForm.mealType) {
      const newFood: FoodLog = {
        id: Date.now().toString(),
        patientId: foodForm.patientId || '',
        patientName: foodForm.patientName,
        date: foodForm.date,
        mealType: foodForm.mealType,
        foodItems: foodForm.foodItems || '',
        calories: foodForm.calories || 0,
        waterIntake: foodForm.waterIntake || 0,
        dietaryRestrictions: foodForm.dietaryRestrictions || '',
        notes: foodForm.notes || ''
      };
      setFoodLogs([...foodLogs, newFood]);
      setFoodForm({});
      setShowFoodForm(false);
    }
  };

  // Delete functions
  const deletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const deleteVital = (id: string) => {
    setVitals(vitals.filter(vital => vital.id !== id));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const deleteFood = (id: string) => {
    setFoodLogs(foodLogs.filter(food => food.id !== id));
  };

  const TabButton = ({ id, label, icon: Icon }: { id: ActiveTab; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? 'bg-blue-600 text-white'
          : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">HomeNurse Dashboard</h1>
          <p className="text-gray-600">Comprehensive patient care management system</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-6">
          <TabButton id="patients" label="Patient Details" icon={Users} />
          <TabButton id="jobs" label="Job Opportunities" icon={Briefcase} />
          <TabButton id="vitals" label="Patient Vitals" icon={Activity} />
          <TabButton id="medications" label="Medication Log" icon={Pill} />
          <TabButton id="food" label="Food Log" icon={Utensils} />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Patient Details Tab */}
          {activeTab === 'patients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Patient Details</h2>
                <button
                  onClick={() => setShowPatientForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Patient</span>
                </button>
              </div>

              {/* Patient Form */}
              {showPatientForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Patient</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Patient Name"
                      value={patientForm.name || ''}
                      onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={patientForm.age || ''}
                      onChange={(e) => setPatientForm({...patientForm, age: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={patientForm.gender || ''}
                      onChange={(e) => setPatientForm({...patientForm, gender: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Medical Condition"
                      value={patientForm.condition || ''}
                      onChange={(e) => setPatientForm({...patientForm, condition: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Contact Number"
                      value={patientForm.contact || ''}
                      onChange={(e) => setPatientForm({...patientForm, contact: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={patientForm.address || ''}
                      onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Emergency Contact"
                      value={patientForm.emergencyContact || ''}
                      onChange={(e) => setPatientForm({...patientForm, emergencyContact: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addPatient}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Patient</span>
                    </button>
                    <button
                      onClick={() => setShowPatientForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Patient List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patients.map((patient) => (
                  <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deletePatient(patient.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Age:</strong> {patient.age}</p>
                      <p><strong>Gender:</strong> {patient.gender}</p>
                      <p><strong>Condition:</strong> {patient.condition}</p>
                      <p><strong>Contact:</strong> {patient.contact}</p>
                      <p><strong>Address:</strong> {patient.address}</p>
                      <p><strong>Emergency:</strong> {patient.emergencyContact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job Opportunities Tab */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Job Opportunities</h2>
                <button
                  onClick={() => setShowJobForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Job</span>
                </button>
              </div>

              {/* Job Form */}
              {showJobForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Job Opportunity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Patient Name"
                      value={jobForm.patientName || ''}
                      onChange={(e) => setJobForm({...jobForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={jobForm.location || ''}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={jobForm.duration || ''}
                      onChange={(e) => setJobForm({...jobForm, duration: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Pay Rate ($/hour)"
                      value={jobForm.payRate || ''}
                      onChange={(e) => setJobForm({...jobForm, payRate: parseFloat(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={jobForm.urgency || ''}
                      onChange={(e) => setJobForm({...jobForm, urgency: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Urgency</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <select
                      value={jobForm.status || ''}
                      onChange={(e) => setJobForm({...jobForm, status: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Status</option>
                      <option value="Open">Open</option>
                      <option value="Applied">Applied</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Requirements (comma separated)"
                      value={jobForm.requirements?.join(', ') || ''}
                      onChange={(e) => setJobForm({...jobForm, requirements: e.target.value.split(',').map(item => item.trim())})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addJob}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Job</span>
                    </button>
                    <button
                      onClick={() => setShowJobForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Job List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">{job.patientName}</h3>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.urgency === 'High' ? 'bg-red-100 text-red-800' :
                          job.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {job.urgency}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                          job.status === 'Applied' ? 'bg-purple-100 text-purple-800' :
                          job.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {job.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteJob(job.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign size={16} />
                        <span>${job.payRate}/hour</span>
                      </div>
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mt-3">
                          <p className="font-medium text-gray-700">Requirements:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Patient Vitals Tab */}
          {activeTab === 'vitals' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Patient Vitals</h2>
                <button
                  onClick={() => setShowVitalForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Vitals</span>
                </button>
              </div>

              {/* Vitals Form */}
              {showVitalForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add Vital Signs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={vitalForm.patientName || ''}
                      onChange={(e) => setVitalForm({...vitalForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.name}>{patient.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={vitalForm.date || ''}
                      onChange={(e) => setVitalForm({...vitalForm, date: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      value={vitalForm.time || ''}
                      onChange={(e) => setVitalForm({...vitalForm, time: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Blood Pressure (e.g., 120/80)"
                      value={vitalForm.bloodPressure || ''}
                      onChange={(e) => setVitalForm({...vitalForm, bloodPressure: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Heart Rate (bpm)"
                      value={vitalForm.heartRate || ''}
                      onChange={(e) => setVitalForm({...vitalForm, heartRate: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Temperature (°F)"
                      value={vitalForm.temperature || ''}
                      onChange={(e) => setVitalForm({...vitalForm, temperature: parseFloat(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Oxygen Saturation (%)"
                      value={vitalForm.oxygenSaturation || ''}
                      onChange={(e) => setVitalForm({...vitalForm, oxygenSaturation: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Notes"
                      value={vitalForm.notes || ''}
                      onChange={(e) => setVitalForm({...vitalForm, notes: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addVital}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Vitals</span>
                    </button>
                    <button
                      onClick={() => setShowVitalForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Vitals List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BP</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O2</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vitals.map((vital) => (
                      <tr key={vital.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vital.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{vital.date}</span>
                            <Clock size={14} />
                            <span>{vital.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.bloodPressure}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.heartRate} bpm</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.temperature}°F</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.oxygenSaturation}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => deleteVital(vital.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Medication Log Tab */}
          {activeTab === 'medications' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Medication Log</h2>
                <button
                  onClick={() => setShowMedicationForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Medication</span>
                </button>
              </div>

              {/* Medication Form */}
              {showMedicationForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add Medication</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={medicationForm.patientName || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.name}>{patient.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Medication Name"
                      value={medicationForm.medicationName || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, medicationName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={medicationForm.dosage || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, dosage: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Frequency"
                      value={medicationForm.frequency || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, frequency: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={medicationForm.startDate || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, startDate: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={medicationForm.endDate || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, endDate: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="datetime-local"
                      placeholder="Administered At"
                      value={medicationForm.administeredAt || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, administeredAt: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Administered By"
                      value={medicationForm.administeredBy || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, administeredBy: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Notes"
                      value={medicationForm.notes || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, notes: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addMedication}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Medication</span>
                    </button>
                    <button
                      onClick={() => setShowMedicationForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Medication List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administered</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medications.map((med) => (
                      <tr key={med.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.medicationName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.dosage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.frequency}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{med.administeredAt}</span>
                            <span>by {med.administeredBy}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => deleteMedication(med.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Food Log Tab */}
          {activeTab === 'food' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Food Log</h2>
                <button
                  onClick={() => setShowFoodForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Food Entry</span>
                </button>
              </div>

              {/* Food Form */}
              {showFoodForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add Food Log</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={foodForm.patientName || ''}
                      onChange={(e) => setFoodForm({...foodForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.name}>{patient.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={foodForm.date || ''}
                      onChange={(e) => setFoodForm({...foodForm, date: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={foodForm.mealType || ''}
                      onChange={(e) => setFoodForm({...foodForm, mealType: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Meal Type</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snack">Snack</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Food Items"
                      value={foodForm.foodItems || ''}
                      onChange={(e) => setFoodForm({...foodForm, foodItems: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Calories"
                      value={foodForm.calories || ''}
                      onChange={(e) => setFoodForm({...foodForm, calories: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Water Intake (oz)"
                      value={foodForm.waterIntake || ''}
                      onChange={(e) => setFoodForm({...foodForm, waterIntake: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Dietary Restrictions"
                      value={foodForm.dietaryRestrictions || ''}
                      onChange={(e) => setFoodForm({...foodForm, dietaryRestrictions: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Notes"
                      value={foodForm.notes || ''}
                      onChange={(e) => setFoodForm({...foodForm, notes: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addFood}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Food Log</span>
                    </button>
                    <button
                      onClick={() => setShowFoodForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Food Log List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodLogs.map((food) => (
                  <div key={food.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{food.patientName}</h3>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          food.mealType === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
                          food.mealType === 'Lunch' ? 'bg-orange-100 text-orange-800' :
                          food.mealType === 'Dinner' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {food.mealType}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteFood(food.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{food.date}</span>
                      </div>
                      <p><strong>Food Items:</strong> {food.foodItems}</p>
                      <p><strong>Calories:</strong> {food.calories}</p>
                      <p><strong>Water Intake:</strong> {food.waterIntake} oz</p>
                      {food.dietaryRestrictions && (
                        <p><strong>Restrictions:</strong> {food.dietaryRestrictions}</p>
                      )}
                      {food.notes && (
                        <p><strong>Notes:</strong> {food.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
=======
import { useState } from 'react';
import { Plus, Users, Briefcase, Activity, Pill, Utensils, Calendar, Clock, MapPin, DollarSign, Edit, Trash2, Save, X } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  contact: string;
  address: string;
  emergencyContact: string;
}

interface JobOpportunity {
  id: string;
  patientName: string;
  location: string;
  duration: string;
  payRate: number;
  requirements: string[];
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Applied' | 'In Progress' | 'Completed';
}

interface Vital {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  notes: string;
}

interface Medication {
  id: string;
  patientId: string;
  patientName: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  administeredAt: string;
  administeredBy: string;
  notes: string;
}

interface FoodLog {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  foodItems: string;
  calories: number;
  waterIntake: number;
  dietaryRestrictions: string;
  notes: string;
}

type ActiveTab = 'patients' | 'jobs' | 'vitals' | 'medications' | 'food';

export default function HomeNurseDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('patients');
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Smith',
      age: 72,
      gender: 'Male',
      condition: 'Diabetes, Hypertension',
      contact: '+1-555-0123',
      address: '123 Oak Street, Springfield',
      emergencyContact: '+1-555-0124'
    },
    {
      id: '2',
      name: 'Mary Johnson',
      age: 68,
      gender: 'Female',
      condition: 'Post-surgical care',
      contact: '+1-555-0125',
      address: '456 Pine Avenue, Springfield',
      emergencyContact: '+1-555-0126'
    }
  ]);

  const [jobs, setJobs] = useState<JobOpportunity[]>([
    {
      id: '1',
      patientName: 'Robert Wilson',
      location: 'Downtown Medical District',
      duration: '8 hours/day, 5 days/week',
      payRate: 35,
      requirements: ['RN License', 'CPR Certified', '2+ years experience'],
      urgency: 'High',
      status: 'Open'
    },
    {
      id: '2',
      patientName: 'Elena Rodriguez',
      location: 'Suburban Care Center',
      duration: '12 hours/day, 3 days/week',
      payRate: 40,
      requirements: ['LPN License', 'Medication Management', 'Wound Care'],
      urgency: 'Medium',
      status: 'Applied'
    }
  ]);

  const [vitals, setVitals] = useState<Vital[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      date: '2025-06-09',
      time: '08:30',
      bloodPressure: '140/90',
      heartRate: 75,
      temperature: 98.6,
      oxygenSaturation: 96,
      notes: 'Stable readings, slight elevation in BP'
    }
  ]);

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      medicationName: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      startDate: '2025-06-01',
      endDate: '2025-08-01',
      administeredAt: '2025-06-09 08:00',
      administeredBy: 'Nurse Sarah',
      notes: 'Take with meals'
    }
  ]);

  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([
    {
      id: '1',
      patientId: '1',
      patientName: 'John Smith',
      date: '2025-06-09',
      mealType: 'Breakfast',
      foodItems: 'Oatmeal, banana, orange juice',
      calories: 320,
      waterIntake: 8,
      dietaryRestrictions: 'Low sodium, diabetic diet',
      notes: 'Patient ate well, blood sugar checked before meal'
    }
  ]);

  // Form states
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showVitalForm, setShowVitalForm] = useState(false);
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [showFoodForm, setShowFoodForm] = useState(false);

  // Form data states
  const [patientForm, setPatientForm] = useState<Partial<Patient>>({});
  const [jobForm, setJobForm] = useState<Partial<JobOpportunity>>({});
  const [vitalForm, setVitalForm] = useState<Partial<Vital>>({});
  const [medicationForm, setMedicationForm] = useState<Partial<Medication>>({});
  const [foodForm, setFoodForm] = useState<Partial<FoodLog>>({});

  // Add functions
  const addPatient = () => {
    if (patientForm.name && patientForm.age && patientForm.gender) {
      const newPatient: Patient = {
        id: Date.now().toString(),
        name: patientForm.name,
        age: patientForm.age,
        gender: patientForm.gender,
        condition: patientForm.condition || '',
        contact: patientForm.contact || '',
        address: patientForm.address || '',
        emergencyContact: patientForm.emergencyContact || ''
      };
      setPatients([...patients, newPatient]);
      setPatientForm({});
      setShowPatientForm(false);
    }
  };

  const addJob = () => {
    if (jobForm.patientName && jobForm.location && jobForm.payRate) {
      const newJob: JobOpportunity = {
        id: Date.now().toString(),
        patientName: jobForm.patientName,
        location: jobForm.location,
        duration: jobForm.duration || '',
        payRate: jobForm.payRate,
        requirements: jobForm.requirements || [],
        urgency: jobForm.urgency || 'Medium',
        status: jobForm.status || 'Open'
      };
      setJobs([...jobs, newJob]);
      setJobForm({});
      setShowJobForm(false);
    }
  };

  const addVital = () => {
    if (vitalForm.patientName && vitalForm.date && vitalForm.time) {
      const newVital: Vital = {
        id: Date.now().toString(),
        patientId: vitalForm.patientId || '',
        patientName: vitalForm.patientName,
        date: vitalForm.date,
        time: vitalForm.time,
        bloodPressure: vitalForm.bloodPressure || '',
        heartRate: vitalForm.heartRate || 0,
        temperature: vitalForm.temperature || 0,
        oxygenSaturation: vitalForm.oxygenSaturation || 0,
        notes: vitalForm.notes || ''
      };
      setVitals([...vitals, newVital]);
      setVitalForm({});
      setShowVitalForm(false);
    }
  };

  const addMedication = () => {
    if (medicationForm.patientName && medicationForm.medicationName) {
      const newMedication: Medication = {
        id: Date.now().toString(),
        patientId: medicationForm.patientId || '',
        patientName: medicationForm.patientName,
        medicationName: medicationForm.medicationName,
        dosage: medicationForm.dosage || '',
        frequency: medicationForm.frequency || '',
        startDate: medicationForm.startDate || '',
        endDate: medicationForm.endDate || '',
        administeredAt: medicationForm.administeredAt || '',
        administeredBy: medicationForm.administeredBy || '',
        notes: medicationForm.notes || ''
      };
      setMedications([...medications, newMedication]);
      setMedicationForm({});
      setShowMedicationForm(false);
    }
  };

  const addFood = () => {
    if (foodForm.patientName && foodForm.date && foodForm.mealType) {
      const newFood: FoodLog = {
        id: Date.now().toString(),
        patientId: foodForm.patientId || '',
        patientName: foodForm.patientName,
        date: foodForm.date,
        mealType: foodForm.mealType,
        foodItems: foodForm.foodItems || '',
        calories: foodForm.calories || 0,
        waterIntake: foodForm.waterIntake || 0,
        dietaryRestrictions: foodForm.dietaryRestrictions || '',
        notes: foodForm.notes || ''
      };
      setFoodLogs([...foodLogs, newFood]);
      setFoodForm({});
      setShowFoodForm(false);
    }
  };

  // Delete functions
  const deletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const deleteVital = (id: string) => {
    setVitals(vitals.filter(vital => vital.id !== id));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const deleteFood = (id: string) => {
    setFoodLogs(foodLogs.filter(food => food.id !== id));
  };

  const TabButton = ({ id, label, icon: Icon }: { id: ActiveTab; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        activeTab === id
          ? 'bg-blue-600 text-white'
          : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">HomeNurse Dashboard</h1>
          <p className="text-gray-600">Comprehensive patient care management system</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-6">
          <TabButton id="patients" label="Patient Details" icon={Users} />
          <TabButton id="jobs" label="Job Opportunities" icon={Briefcase} />
          <TabButton id="vitals" label="Patient Vitals" icon={Activity} />
          <TabButton id="medications" label="Medication Log" icon={Pill} />
          <TabButton id="food" label="Food Log" icon={Utensils} />
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Patient Details Tab */}
          {activeTab === 'patients' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Patient Details</h2>
                <button
                  onClick={() => setShowPatientForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Patient</span>
                </button>
              </div>

              {/* Patient Form */}
              {showPatientForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Patient</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Patient Name"
                      value={patientForm.name || ''}
                      onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={patientForm.age || ''}
                      onChange={(e) => setPatientForm({...patientForm, age: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={patientForm.gender || ''}
                      onChange={(e) => setPatientForm({...patientForm, gender: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Medical Condition"
                      value={patientForm.condition || ''}
                      onChange={(e) => setPatientForm({...patientForm, condition: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Contact Number"
                      value={patientForm.contact || ''}
                      onChange={(e) => setPatientForm({...patientForm, contact: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={patientForm.address || ''}
                      onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Emergency Contact"
                      value={patientForm.emergencyContact || ''}
                      onChange={(e) => setPatientForm({...patientForm, emergencyContact: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addPatient}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Patient</span>
                    </button>
                    <button
                      onClick={() => setShowPatientForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Patient List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patients.map((patient) => (
                  <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{patient.name}</h3>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deletePatient(patient.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Age:</strong> {patient.age}</p>
                      <p><strong>Gender:</strong> {patient.gender}</p>
                      <p><strong>Condition:</strong> {patient.condition}</p>
                      <p><strong>Contact:</strong> {patient.contact}</p>
                      <p><strong>Address:</strong> {patient.address}</p>
                      <p><strong>Emergency:</strong> {patient.emergencyContact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Job Opportunities Tab */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Job Opportunities</h2>
                <button
                  onClick={() => setShowJobForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Job</span>
                </button>
              </div>

              {/* Job Form */}
              {showJobForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add New Job Opportunity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Patient Name"
                      value={jobForm.patientName || ''}
                      onChange={(e) => setJobForm({...jobForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={jobForm.location || ''}
                      onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={jobForm.duration || ''}
                      onChange={(e) => setJobForm({...jobForm, duration: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Pay Rate ($/hour)"
                      value={jobForm.payRate || ''}
                      onChange={(e) => setJobForm({...jobForm, payRate: parseFloat(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={jobForm.urgency || ''}
                      onChange={(e) => setJobForm({...jobForm, urgency: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Urgency</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                    <select
                      value={jobForm.status || ''}
                      onChange={(e) => setJobForm({...jobForm, status: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Status</option>
                      <option value="Open">Open</option>
                      <option value="Applied">Applied</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Requirements (comma separated)"
                      value={jobForm.requirements?.join(', ') || ''}
                      onChange={(e) => setJobForm({...jobForm, requirements: e.target.value.split(',').map(item => item.trim())})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addJob}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Job</span>
                    </button>
                    <button
                      onClick={() => setShowJobForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Job List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">{job.patientName}</h3>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.urgency === 'High' ? 'bg-red-100 text-red-800' :
                          job.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {job.urgency}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                          job.status === 'Applied' ? 'bg-purple-100 text-purple-800' :
                          job.status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {job.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteJob(job.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign size={16} />
                        <span>${job.payRate}/hour</span>
                      </div>
                      {job.requirements && job.requirements.length > 0 && (
                        <div className="mt-3">
                          <p className="font-medium text-gray-700">Requirements:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {job.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Patient Vitals Tab */}
          {activeTab === 'vitals' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Patient Vitals</h2>
                <button
                  onClick={() => setShowVitalForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Vitals</span>
                </button>
              </div>

              {/* Vitals Form */}
              {showVitalForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add Vital Signs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={vitalForm.patientName || ''}
                      onChange={(e) => setVitalForm({...vitalForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.name}>{patient.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={vitalForm.date || ''}
                      onChange={(e) => setVitalForm({...vitalForm, date: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      value={vitalForm.time || ''}
                      onChange={(e) => setVitalForm({...vitalForm, time: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Blood Pressure (e.g., 120/80)"
                      value={vitalForm.bloodPressure || ''}
                      onChange={(e) => setVitalForm({...vitalForm, bloodPressure: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Heart Rate (bpm)"
                      value={vitalForm.heartRate || ''}
                      onChange={(e) => setVitalForm({...vitalForm, heartRate: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Temperature (°F)"
                      value={vitalForm.temperature || ''}
                      onChange={(e) => setVitalForm({...vitalForm, temperature: parseFloat(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Oxygen Saturation (%)"
                      value={vitalForm.oxygenSaturation || ''}
                      onChange={(e) => setVitalForm({...vitalForm, oxygenSaturation: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Notes"
                      value={vitalForm.notes || ''}
                      onChange={(e) => setVitalForm({...vitalForm, notes: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addVital}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Vitals</span>
                    </button>
                    <button
                      onClick={() => setShowVitalForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Vitals List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BP</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HR</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">O2</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {vitals.map((vital) => (
                      <tr key={vital.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{vital.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{vital.date}</span>
                            <Clock size={14} />
                            <span>{vital.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.bloodPressure}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.heartRate} bpm</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.temperature}°F</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vital.oxygenSaturation}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => deleteVital(vital.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Medication Log Tab */}
          {activeTab === 'medications' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Medication Log</h2>
                <button
                  onClick={() => setShowMedicationForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Medication</span>
                </button>
              </div>

              {/* Medication Form */}
              {showMedicationForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add Medication</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={medicationForm.patientName || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.name}>{patient.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Medication Name"
                      value={medicationForm.medicationName || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, medicationName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={medicationForm.dosage || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, dosage: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Frequency"
                      value={medicationForm.frequency || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, frequency: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={medicationForm.startDate || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, startDate: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={medicationForm.endDate || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, endDate: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="datetime-local"
                      placeholder="Administered At"
                      value={medicationForm.administeredAt || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, administeredAt: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Administered By"
                      value={medicationForm.administeredBy || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, administeredBy: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Notes"
                      value={medicationForm.notes || ''}
                      onChange={(e) => setMedicationForm({...medicationForm, notes: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addMedication}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Medication</span>
                    </button>
                    <button
                      onClick={() => setShowMedicationForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Medication List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administered</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medications.map((med) => (
                      <tr key={med.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{med.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.medicationName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.dosage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{med.frequency}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>{med.administeredAt}</span>
                            <span>by {med.administeredBy}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => deleteMedication(med.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Food Log Tab */}
          {activeTab === 'food' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Food Log</h2>
                <button
                  onClick={() => setShowFoodForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Food Entry</span>
                </button>
              </div>

              {/* Food Form */}
              {showFoodForm && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold mb-4">Add Food Log</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={foodForm.patientName || ''}
                      onChange={(e) => setFoodForm({...foodForm, patientName: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Patient</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.name}>{patient.name}</option>
                      ))}
                    </select>
                    <input
                      type="date"
                      value={foodForm.date || ''}
                      onChange={(e) => setFoodForm({...foodForm, date: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={foodForm.mealType || ''}
                      onChange={(e) => setFoodForm({...foodForm, mealType: e.target.value as any})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Meal Type</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snack">Snack</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Food Items"
                      value={foodForm.foodItems || ''}
                      onChange={(e) => setFoodForm({...foodForm, foodItems: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Calories"
                      value={foodForm.calories || ''}
                      onChange={(e) => setFoodForm({...foodForm, calories: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Water Intake (oz)"
                      value={foodForm.waterIntake || ''}
                      onChange={(e) => setFoodForm({...foodForm, waterIntake: parseInt(e.target.value)})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Dietary Restrictions"
                      value={foodForm.dietaryRestrictions || ''}
                      onChange={(e) => setFoodForm({...foodForm, dietaryRestrictions: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Notes"
                      value={foodForm.notes || ''}
                      onChange={(e) => setFoodForm({...foodForm, notes: e.target.value})}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={addFood}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={20} />
                      <span>Save Food Log</span>
                    </button>
                    <button
                      onClick={() => setShowFoodForm(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X size={20} />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Food Log List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodLogs.map((food) => (
                  <div key={food.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{food.patientName}</h3>
                      <div className="flex space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          food.mealType === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
                          food.mealType === 'Lunch' ? 'bg-orange-100 text-orange-800' :
                          food.mealType === 'Dinner' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {food.mealType}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteFood(food.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{food.date}</span>
                      </div>
                      <p><strong>Food Items:</strong> {food.foodItems}</p>
                      <p><strong>Calories:</strong> {food.calories}</p>
                      <p><strong>Water Intake:</strong> {food.waterIntake} oz</p>
                      {food.dietaryRestrictions && (
                        <p><strong>Restrictions:</strong> {food.dietaryRestrictions}</p>
                      )}
                      {food.notes && (
                        <p><strong>Notes:</strong> {food.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
>>>>>>> 7697930 (Initial commit3)
}