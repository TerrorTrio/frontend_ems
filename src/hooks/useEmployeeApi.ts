import {useCallback, useState} from "react";
import { useAuth } from "react-oidc-context";
import type {Employee} from "../types/employee.ts";
import {getEmployees} from "../services/employeeService.ts";

export function useEmployeeApi() {
    const auth = useAuth();

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getEmployees(auth.user?.access_token);

            setEmployees(response.results ?? []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    }, [auth.user?.access_token]);

    return {employees, fetchEmployees, loading, error};
}