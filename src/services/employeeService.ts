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

export async function fetchSingleEmployeeFromApi({
                                                     accessToken,
                                                     employeeId
                                                 }: FetchSingleEmployeeProps): Promise<Employee> {

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

interface UpdateEmployeeProps {
    accessToken?: string,
    employeeId: number,
    employee: Employee
}

export async function updateEmployeeInApi({accessToken, employeeId, employee}: UpdateEmployeeProps): Promise<Employee> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const body = {
        lastName: employee.lastName,
        firstName: employee.firstName,
        street: employee.street,
        postcode: employee.postcode,
        city: employee.city,
        phone: employee.phone,
        skillSet: employee.skillSet?.map(skill => skill.id) ?? []
    };

    const response = await fetch(`${BASE_URL}/employees/${employeeId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Fehler beim Aktualisieren: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

interface SaveEmployeeProps {
    accessToken?: string,
    employee: Employee
}

export async function saveEmployeeInApi({accessToken, employee}: SaveEmployeeProps): Promise<Employee> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const body = {
        lastName: employee.lastName,
        firstName: employee.firstName,
        street: employee.street,
        postcode: employee.postcode,
        city: employee.city,
        phone: employee.phone,
        skillSet: employee.skillSet?.map(skill => skill.id) ?? []
    };

    const response = await fetch(`${BASE_URL}/employees`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`Fehler beim Speichern: ${response.status}. ${errorBody.message}`);
    }

    return response.json();
}