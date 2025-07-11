import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import axiosAuth from "../api/axiosAuth";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

type RelativeContextType = {
    patients: any[];
    RelativeContextLoading: boolean;
    carePlans: any[]
    payments: any[]
    fetchPatients: () => void;
    fetchCarePlans: () => void;
    fetchPayments: () => void
};

const RelativeContext = createContext<RelativeContextType>({
    patients: [],
    RelativeContextLoading: false,
    carePlans: [],
    payments: [],
    fetchPatients: () => { },
    fetchCarePlans: () => { },
    fetchPayments: () => { },
});


export const RelativeProvider = ({ children }: { children: ReactNode }) => {
    const [patients, setPatients] = useState<any>([]);
    const [carePlans, setCarePlans] = useState<any>([])
    const [payments, setPayments] = useState<any>([])
    const [RelativeContextLoading, setRelativeContextLoading] = useState(false);
    const { user } = useAuth()

    useEffect(() => {
        setRelativeContextLoading(true);
        if (user?.role == "Relative") {
            fetchPatients();
            fetchCarePlans();
            setRelativeContextLoading(false);
        }

    }, [user])
    const fetchPatients = async () => {
        try {
            setRelativeContextLoading(true);
            const res = await axiosAuth.get("Relative/get-patient-of-relative");
            const patientR = res.data.data;
            if (res.data.success) {
                setPatients(patientR);
            }
            console.log(res.data)
        } catch (error) {
            console.error('Error fetching patients:', error);
            toast.error('Failed to fetch patient data');
             setRelativeContextLoading(false);
        } finally {
            setRelativeContextLoading(false);
        }
    };
    const fetchCarePlans = async () => {
        try {
            setRelativeContextLoading(true);

            const res = await axiosAuth.get("CareTypeRate/GetAllPlans");
            const CarePlansR = res.data.data
            console.log(res)
            setCarePlans(CarePlansR);
        }
        catch (error) {
            console.error('Error fetching patients:', error);
             setRelativeContextLoading(false);
        }
        finally {
            setRelativeContextLoading(false);
        }
    }

    const fetchPayments = async () => {
        try {
            setRelativeContextLoading(true);

            const response = await axiosAuth.get("Payment/my-payments"); // ✅ await here
            setPayments(response.data.data); // ✅ use resolved response
            console.log(response)

        } catch (error) {
            console.error('Error fetching payments:', error);
             setRelativeContextLoading(false);
        } finally {
            setRelativeContextLoading(false);
        }
    };

    return (
        <RelativeContext.Provider value={{ RelativeContextLoading, fetchCarePlans, fetchPayments, fetchPatients, carePlans, patients, payments }}>
            {children}
        </RelativeContext.Provider>
    );

}

export const useRelative = () => useContext(RelativeContext);


// import heroImage from '../assets/illustrations/service2.png';
// import service1 from '../assets/illustrations/service1.png';
// import service2 from '../assets/illustrations/service2.png';
// import service3 from '../assets/illustrations/service3.png';