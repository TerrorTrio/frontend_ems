import {useAuth} from "react-oidc-context";
import {useState} from "react";
import type {Employee} from "../../types/employee.ts";
import {useEmployees} from "../../context/EmployeeContext.tsx";
import {saveEmployeeInApi} from "../../services/employeeService.ts";

export function useSaveEmployee() {
    const auth = useAuth();

    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const {employees, setEmployees, setFilteredEmployees} = useEmployees();

    const saveEmployee = async (employee: Employee): Promise<Employee | null> => {
        setSaving(true);
        setSaveError(null);

        try {
            const savedEmployee = await saveEmployeeInApi({
                accessToken: auth.user?.access_token,
                employee
            });

            const updatedEmployees = employees.concat(savedEmployee);
            setEmployees(updatedEmployees);
            setFilteredEmployees(updatedEmployees);
            return savedEmployee;
        } catch (error) {
            setSaveError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
            return null;
        } finally {
            setSaving(false);
        }
    };

    return {saveEmployee, saving, saveError};
}