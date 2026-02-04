import type {Employee} from "../types/employee.ts";
import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import {fetchEmployeesFromApi} from "../services/employeeService.ts";
import {useAuth} from "react-oidc-context";

type EmployeeContextType = {
    employees: Employee[];
    filteredEmployees: Employee[];
    setEmployees: (employees: Employee[]) => void;
    setFilteredEmployees: (employees: Employee[]) => void;
    loading: boolean;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider = ({children} : {children : ReactNode}) => {
    const auth = useAuth();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEmployees = async () => {
            const data = await fetchEmployeesFromApi(auth.user?.access_token);
            setEmployees(data);
            setFilteredEmployees(data);
            setLoading(false);
        };
        loadEmployees();
    }, [auth.user?.access_token]);

    return <EmployeeContext.Provider value={{employees, setEmployees, filteredEmployees, setFilteredEmployees, loading}}>
        {children}
    </EmployeeContext.Provider>
}

export const useEmployees = () => {
    const context = useContext(EmployeeContext);
    if (!context) {
        throw new Error("useEmployees muss innerhalb von EmployeeProvider verwendet werden");
    }
    return context;
}