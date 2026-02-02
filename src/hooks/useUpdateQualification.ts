import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { updateQualificationsFromApi } from "../services/qualificationService";
import type { Skill } from "../types/skill";

export function useUpdateQualification() {
    const auth = useAuth();

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateQualification = async (id: number, newSkillName: string): Promise<Skill | null> => {
        setIsUpdating(true);
        setUpdateError(null);

        try {
            const updated = await updateQualificationsFromApi(
                id,
                newSkillName,
                auth.user?.access_token
            );

            return updated;
        } catch (error) {
            setUpdateError(
                error instanceof Error ? error.message : "Fehler beim Aktualisieren"
            );
            return null;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        isUpdating,
        updateError,
        updateQualification,
    };
}
