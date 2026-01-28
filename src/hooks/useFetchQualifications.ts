import {useAuth} from "react-oidc-context";
import {useEffect, useState} from "react";
import {fetchQualifications} from "../services/qualificationService.ts";
import type {Skill} from "../types/employee.ts";

export function useFetchQualifications() {
    const auth = useAuth();

    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!auth.isAuthenticated || !auth.user?.access_token){
            setLoading(false);
            setError("Nicht authentifiziert");
            return;
        }

        const load = async () => {
            try {
                const data = await fetchQualifications(auth.user?.access_token);
                setSkills(data);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [auth.isAuthenticated, auth.user?.access_token]);

    return {skills, loading, error};
}