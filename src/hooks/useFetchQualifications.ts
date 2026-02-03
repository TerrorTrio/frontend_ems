import {useCallback, useEffect, useState} from "react";
import {useAuth} from "react-oidc-context";
import type {Skill} from "../types/skill.ts";
import {fetchQualificationsFromApi} from "../services/qualificationService.ts";

export function useFetchQualifications() {
    const auth = useAuth();

    const [skills, setSkills] = useState<Skill[]>([]);
    const [loadingQualifications, setLoadingQualifications] = useState(false);
    const [fetchQualificationError, setFetchQualificationError] = useState<string | null>(null);

    const fetchQualifications = useCallback(async () => {
        setLoadingQualifications(true);
        setFetchQualificationError(null);

        try {
            const response = await fetchQualificationsFromApi(auth.user?.access_token);
            setSkills(response);
        } catch (error) {
            setFetchQualificationError(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
        } finally {
            setLoadingQualifications(false);
        }
    }, [auth.user?.access_token]);

    useEffect(() => {
        fetchQualifications();
    }, [fetchQualifications]);

    return {fetchQualifications, skills, loadingQualifications, fetchQualificationError};
}