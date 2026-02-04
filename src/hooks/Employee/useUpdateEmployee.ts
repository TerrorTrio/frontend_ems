import {useAuth} from "react-oidc-context";
import {useState} from "react";
import {useEmployees} from "../../context/EmployeeContext.tsx";
import type {Employee} from "../../types/employee.ts";
import {updateEmployeeInApi} from "../../services/employeeService.ts";

export function useUpdateEmployee() {
    const auth = useAuth();

    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const {employees, setEmployees, setFilteredEmployees} = useEmployees();

    const updateEmployee = async (employee: Employee): Promise<Employee | null> => {
        setUpdating(true);
        setUpdateError(null);

        try {
            const updatedEmployee = await updateEmployeeInApi({
                accessToken: auth.user?.access_token,
                employeeId: employee.id,
                employee
            })

            const updatedList = employees.map(employee => employee.id === updatedEmployee.id ? updatedEmployee : employee);
            setEmployees(updatedList);
            setFilteredEmployees(updatedList);

            return updatedEmployee;
        } catch (error) {
            setUpdateError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
            return null;
        } finally {
            setUpdating(false);
        }
    };

    return {updateEmployee, updating, updateError};
}