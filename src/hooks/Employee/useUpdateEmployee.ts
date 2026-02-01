import {useAuth} from "react-oidc-context";
import {useState} from "react";
import type {Employee} from "../../types/employee.ts";
import {updateEmployeeInApi} from "../../services/employeeService.ts";

export function useUpdateEmployee() {
    const auth = useAuth();

    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateEmployee = async (employee: Employee): Promise<Employee | null> => {
        setUpdating(true);
        setUpdateError(null);

        try {
            return await updateEmployeeInApi({
                accessToken: auth.user?.access_token,
                employeeId: employee.id,
                employee
            })
        } catch (error) {
            setUpdateError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
            return null;
        } finally {
            setUpdating(false);
        }
    };

    return {updateEmployee, updating, updateError};
}