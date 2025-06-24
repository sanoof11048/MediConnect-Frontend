import React, { useEffect, useState } from 'react';
import HomeNurseSidebar from '../features/homeNurse/components/HomeNurseSideBar';
import HomeNurseHeader from '../features/homeNurse/components/HomeNurseHeader';

interface DashboardLayoutProps {
    children: React.ReactNode;
    selectedPatientId: string;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    patients: any[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setSelectedPatient: (id: string) => void;
}

const HomeNurseLayout: React.FC<DashboardLayoutProps> = ({
    children,
    selectedPatientId,
    sidebarCollapsed,
    setSidebarCollapsed,
    patients,
    searchTerm,
    setSearchTerm,
    setSelectedPatient
}) => {
    const [headerPatients, setHeaderPatients] = useState<any>(null)
    useEffect(() => {
    const selectedPatient = patients.find((p) => p.id === selectedPatientId);
    setHeaderPatients(selectedPatient || null);
}, [selectedPatientId, patients]);

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <HomeNurseSidebar
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                patients={patients}
                selectedPatient={selectedPatientId}
                onPatientSelect={setSelectedPatient}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <HomeNurseHeader currentPatient={headerPatients} />
                {children}
            </div>
        </div>
    );
};

export default HomeNurseLayout;
