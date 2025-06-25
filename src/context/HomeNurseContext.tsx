import { createContext, useContext,  useState, type ReactNode } from "react";
import toast from "react-hot-toast";
import axiosAuth from "../api/axiosAuth";

export interface VitalDTO { vitalId: string; patientId: string; value: string; createdAt: string; updatedAt: string; /* ...other fields */ }
export interface MedicationDTO { medicationId: string; patientId: string; name: string; dosage: string; createdAt: string; updatedAt: string; }
export interface MealDTO { mealId: string; patientId: string; description: string; createdAt: string; updatedAt: string; }


type HomeNurseContextType = {
    homeNurseLoading: boolean;
    patients: any[];
    vitals: VitalDTO[];
    medications: MedicationDTO[];
    meals: MealDTO[];

    fetchPatients: () => Promise<void>;
    fetchVitals: (patientId: string) => Promise<void>;
    addVital: (dto: Omit<VitalDTO, 'vitalId'|'createdAt'|'updatedAt'>) => Promise<void>;
    updateVital: (dto: VitalDTO) => Promise<void>;
    deleteVital: (id: string) => Promise<void>;

    fetchMedications: (patientId: string) => Promise<void>;
    addMedication: (dto: Omit<MedicationDTO, 'medicationId'|'createdAt'|'updatedAt'>) => Promise<void>;
    updateMedication: (dto: MedicationDTO) => Promise<void>;
    deleteMedication: (id: string) => Promise<void>;

    fetchMeals: (patientId: string) => Promise<void>;
    addMeal: (dto: Omit<MealDTO, 'mealId'|'createdAt'|'updatedAt'>) => Promise<void>;
    updateMeal: (dto: MealDTO) => Promise<void>;
    deleteMeal: (id: string) => Promise<void>;
};

// Provide a default context value or use undefined and guard in hook
const HomeNurseContext = createContext<HomeNurseContextType | undefined>(undefined);

export const HomeNurseProvider = ({ children }: { children: ReactNode }) => {
    const [homeNurseLoading, setHomeNurseLoading] = useState(true);
    const [patients, setPatients] = useState<any[]>([]);
    const [vitals, setVitals] = useState<VitalDTO[]>([]);
    const [medications, setMedications] = useState<MedicationDTO[]>([]);
    const [meals, setMeals] = useState<MealDTO[]>([]);

    const fetchPatients = async () => {
        try {
            const res = await axiosAuth.get('/Nurse/getPatientsOfHomeNurse');
            setPatients(res.data.data);
            console.log(res.data)
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch patients');
        } finally{
            setHomeNurseLoading(false)

        }
    };

    const fetchVitals = async (patientId: string) => {
        try {
            const res = await axiosAuth.get(`/Vital/vitals/patient/${patientId}`);
            setVitals(res.data.data);
            console.log(res.data)
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch vitals');
        }
    };
    const addVital = async (dto: Omit<VitalDTO, 'vitalId'|'createdAt'|'updatedAt'>) => {
        try {
            const res = await axiosAuth.post<VitalDTO>('/Vital/vital', dto);
            setVitals(prev => [...prev, res.data]);
            console.log(res.data)
        } catch (error: any) {
            toast.error(error.message || 'Failed to add vital');
        }
    };
    const updateVital = async (dto: VitalDTO) => {
        try {
            console.log(dto)
            const res = await axiosAuth.put('/Vital/vital', dto);
            console.log(res.data)
            setVitals(prev => prev.map(v => v.vitalId === res.data.data.vitalId ? res.data.data : v));
        } catch (error: any) {
            toast.error(error.message || 'Failed to update vital');
        }
    };
    const deleteVital = async (id: string) => {
        try {
            await axiosAuth.delete(`/Vital/vital/${id}`);
            setVitals(prev => prev.filter(v => v.vitalId !== id));
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete vital');
        }
    };

    const fetchMedications = async (patientId: string) => {
        try {
            const res = await axiosAuth.get(`/MedicationLog/patient/${patientId}`);
            setMedications(res.data.data);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch medications');
        }
    };
    const addMedication = async (dto: Omit<MedicationDTO, 'medicationId'|'createdAt'|'updatedAt'>) => {
        try {
            const res = await axiosAuth.post('/MedicationLog', dto);
            setMedications(prev => [...prev, res.data]);
        } catch (error: any) {
            toast.error(error.message || 'Failed to add medication');
        }
    };
    const updateMedication = async (dto: MedicationDTO) => {
        try {
            const res = await axiosAuth.put<MedicationDTO>('/MedicationLog', dto);
            setMedications(prev => prev.map(m => m.medicationId === res.data.medicationId ? res.data : m));
        } catch (error: any) {
            toast.error(error.message || 'Failed to update medication');
        }
    };
    const deleteMedication = async (id: string) => {
        try {
            await axiosAuth.delete(`/MedicationLog/${id}`);
            setMedications(prev => prev.filter(m => m.medicationId !== id));
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete medication');
        }
    };

    const fetchMeals = async (patientId: string) => {
        try {
            const res = await axiosAuth.get(`/FoodLog/patient/${patientId}`);
            setMeals(res.data.data);
        } catch (error: any) {
            toast.error(error.message || 'Failed to fetch meals');
        }
    };
    const addMeal = async (dto: Omit<MealDTO, 'mealId'|'createdAt'|'updatedAt'>) => {
        try {
            const res = await axiosAuth.post('/FoodLog', dto);
            setMeals(prev => [...prev, res.data.data]);
        } catch (error: any) {
            toast.error(error.message || 'Failed to add meal');
        }
    };
    const updateMeal = async (dto: MealDTO) => {
        try {
            const res = await axiosAuth.put('/FoodLog', dto);
            setMeals(prev => prev.map(m => m.mealId === res.data.data.mealId ? res.data.data : m));
        } catch (error: any) {
            toast.error(error.message || 'Failed to update meal');
        }
    };
    const deleteMeal = async (id: string) => {
        try {
            await axiosAuth.delete(`/FoodLog/${id}`);
            setMeals(prev => prev.filter(m => m.mealId !== id));
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete meal');
        }
    };

    // useEffect(() => { fetchPatients().finally(() => setHomeNurseLoading(false)); }, []);

    return (
        <HomeNurseContext.Provider value={{ homeNurseLoading, patients,
          vitals, medications, meals,
          fetchPatients, fetchVitals, addVital, updateVital, deleteVital,
          fetchMedications, addMedication, updateMedication, deleteMedication,
          fetchMeals, addMeal, updateMeal, deleteMeal }}>            {children}
        </HomeNurseContext.Provider>
    );
}

export const useHomeNurse = (): HomeNurseContextType => {
  const context = useContext(HomeNurseContext);
  if (!context) throw new Error('useHomeNurse must be used within HomeNurseProvider');
  return context;
};
