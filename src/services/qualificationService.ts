import type { Skill } from "../types/employee";

export async function fetchQualifications(token?: string): Promise<Skill[]> {
const response = await fetch("http://localhost:8089/qualifications", {
    headers: {
        Authorization: token ? `Bearer ${token}` : "",
    },
});
if (!response.ok){
    throw new Error("Fehler beim Laden der Qualifikationen");
}
return response.json();
}