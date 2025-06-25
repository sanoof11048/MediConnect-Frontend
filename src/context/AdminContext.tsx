import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axiosAuth from "../api/axiosAuth";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

type AdminContextType = {
  fetchNurses: () => Promise<void>;
  fetchPatients: () => Promise<void>;
  fetchAssignments: () => Promise<void>;
  fetchRequests: () => Promise<void>;
  fetchRelatives: () => Promise<void>;
  nurses: any[];
  patients: any[];
  requests: any[];
  relatives: any[];
  adminLoading: boolean;
  assignments: any[];
  handleAssignNurse: (
    requestId: string,
    nurseId: string
  ) => Promise<void>;
  handleAddNurse: (nurseData: NurseProfileCreateDTO) => Promise<void>;
  handleBlockUser: (userId: string) => Promise<void>;
};

interface NurseProfileCreateDTO {
  homeNurseId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  dob: string;
  availableOn: string;
  isAvailable: boolean;
}

const AdminContext = createContext<AdminContextType>({
  fetchNurses: async () => {},
  fetchPatients: async () => {},
  fetchRequests: async () => {},
  fetchAssignments: async () => {},
  fetchRelatives: async () => {},
  nurses: [],
  patients: [],
  requests: [],
  assignments: [],
  relatives: [],
  adminLoading: true,
  handleAssignNurse: async () => {},
  handleAddNurse: async () => {},
  handleBlockUser: async () => {},
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [nurses, setNurses] = useState([]);
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [relatives, setRelatives] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "Admin") {
      const loadData = async () => {
        setAdminLoading(true);
        await Promise.allSettled([
          fetchNurses(),
          fetchPatients(),
          fetchRequests(),
          fetchAssignments(),
          fetchRelatives(),
        ]);
        setAdminLoading(false);
      };

      loadData();
    }
            setAdminLoading(false);

  }, [user]);

  const fetchNurses = async (): Promise<void> => {
    try {
      const res = await axiosAuth.get("/Admin/GetAllNurses");
      if (res.data.success) {
        setNurses(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching nurses:", error);
    }
  };

  const fetchPatients = async (): Promise<void> => {
    try {
      const res = await axiosAuth.get("/Admin/GetAllPatients");
      if (res.data.success) {
        setPatients(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const fetchRequests = async (): Promise<void> => {
    try {
      const res = await axiosAuth.get("/NurseRequest/GetAll");
      if (res.data.success) {
        setRequests(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const fetchAssignments = async (): Promise<void> => {
    try {
      const res = await axiosAuth.get("/NurseRequest/assignments");
      if (res.data.success) {
        setAssignments(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchRelatives = async (): Promise<void> => {
    try {
      const res = await axiosAuth.get("/Relative/GetAllRelatives");
      if (res.data.success) {
        setRelatives(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching relatives:", error);
    }
  };

  const handleAddNurse = async (
    nurseData: NurseProfileCreateDTO
  ): Promise<void> => {
    try {
      const nursePayload = {
        ...nurseData,
        dob: new Date(nurseData.dob).toISOString().split("T")[0],
        availableOn: new Date(nurseData.availableOn)
          .toISOString()
          .split("T")[0],
      };

      if (!nursePayload.email) {
        toast.error("Email cannot be empty");
        return;
      }

      const response = await axiosAuth.post("/Admin/AddNurse", nursePayload);
      toast.success(response?.data?.message || "Nurse added successfully!");
      console.log("Nurse added:", response.data);
    } catch (error) {
      console.error("Error adding nurse:", error);
      toast.error("Failed to add nurse.");
    }
  };

  const handleAssignNurse = async (
    requestId: string,
    nurseId: string
  ): Promise<void> => {
    try {
      await axiosAuth.post("/NurseRequest/assign", {
        requestId,
        nurseId,
      });
      toast.success("Nurse assigned successfully!");
      fetchRequests();
    } catch (error: any) {
      console.error("Error assigning nurse:", error);
      if (error.response?.data?.errors) {
        console.error("Validation Errors:", error.response.data.errors);
      }
      toast.error("Failed to assign nurse.");
    }
  };

  const handleBlockUser = async (userId: string): Promise<void> => {
    const promise = axiosAuth.patch(`User/${userId}/toggle-block`);

    toast.promise(
      promise,
      {
        loading: "Processing...",
        success: (res) => res.data?.data || "User updated successfully!",
        error: (err) =>
          err.response?.data?.message || "Something went wrong!",
      },
      {
        success: { duration: 3000 },
        error: { duration: 4000 },
      }
    );

    try {
      const response = await promise;
      console.log("Block response:", response.data);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        fetchNurses,
        fetchPatients,
        fetchRequests,
        fetchAssignments,
        fetchRelatives,
        nurses,
        patients,
        requests,
        assignments,
        relatives,
        adminLoading,
        handleAssignNurse,
        handleAddNurse,
        handleBlockUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
