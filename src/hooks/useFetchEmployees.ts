import {useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import type {Employee} from "../types/employee.ts";
import {fetchEmployeesFromApi} from "../services/employeeService.ts";
import type {Employee} from "../types/employee.ts";

export function useFetchEmployees() {
    const auth = useAuth();

    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchEmployeesFromApi(auth.user?.access_token);
            setEmployees(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [auth.user?.access_token]);

    return {refetch: fetchEmployees, employees, loading, error};
}