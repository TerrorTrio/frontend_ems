import {useEffect, useState} from "react";
import { useAuth } from "react-oidc-context";
import {fetchEmployeesFromApi} from "../services/employeeService.ts";
import type {Employee} from "../types/employee.ts";

export function useFetchEmployees(setEmployees: (employees: Employee[]) => void) {
    const auth = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
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
        };
        fetchEmployees();
    }, [auth.user?.access_token, setEmployees]);

    return {loading, error};
}