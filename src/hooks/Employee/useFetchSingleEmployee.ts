import {useAuth} from "react-oidc-context";
import {useEffect, useState} from "react";
import type {Employee} from "../../types/employee.ts";
import {fetchSingleEmployeeFromApi} from "../../services/employeeService.ts";

export function useFetchSingleEmployee(employeeId: number) {
    const auth = useAuth();

    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployee = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchSingleEmployeeFromApi({
                accessToken: auth.user?.access_token,
                employeeId: employeeId
            });
            setEmployee(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [auth.user?.access_token]);

    return {refetch: fetchEmployee, employee, loading, error};
}