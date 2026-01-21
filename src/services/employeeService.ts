import type {Employee} from "../types/employee.ts";

const BASE_URL = "http://localhost:8089"

export async function fetchEmployeesFromApi(accessToken?: string): Promise<Employee[]> {

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/employees`, {headers});

    if (!response.ok) {
        throw new Error(`Fehler beim Laden der Mitarbeiter: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

interface RemoveEmployeeProps {
    accessToken?: string,
    employeeId: number
}

export async function removeEmployeeFromApi({accessToken, employeeId}: RemoveEmployeeProps): Promise<void> {

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {method: "DELETE", headers});

    if (!response.ok) {
        throw new Error(`Fehler beim Löschen eines Mitarbeiters: ${response.status} ${response.statusText}`)
    }
}

interface FetchSingleEmployeeProps {
    accessToken?: string,
    employeeId: number
}

export async function fetchSingleEmployeeFromApi({accessToken, employeeId}: FetchSingleEmployeeProps): Promise<Employee> {

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {method: "GET", headers});

    if (!response.ok) {
        throw new Error(`Fehler beim Laden eines Mitarbeiters: ${response.status} ${response.statusText}`)
    }

    return response.json();
}