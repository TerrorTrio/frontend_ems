import {useCallback, useState} from "react";
import { useAuth } from "react-oidc-context";
import {fetchEmployeesFromApi} from "../services/employeeService.ts";
import type {Employee} from "../types/employee.ts";

export function useFetchEmployees(setEmployees: (employees: Employee[]) => void) {
    const auth = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchEmployeesFromApi(auth.user?.access_token);
            setEmployees(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    }, [auth.user?.access_token]);

    fetchEmployees();
    return {loading, error};
}