import type {Employee} from "../types/employee.ts";

const BASE_URL = "http://localhost:8089"

export async function getEmployees(accessToken?: string): Promise<Employee[]> {

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/employees`, {headers});

    if (!response.ok) {
        throw new Error("Fehler beim Laden der Mitarbeiter");
    }

    return response.json();
}