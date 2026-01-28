import type {Skill} from "../types/skill.ts";

const BASE_URL = "http://localhost:8089"

export async function fetchQualificationsFromApi(accessToken?: string): Promise<Skill[]> {

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}/qualifications`, {headers});

    if (!response.ok) {
        throw new Error(`Fehler beim Laden der Qualifikationen: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// export async function updateQualificationsFromApi(id: number, skill: string, token?: string){
//
// }