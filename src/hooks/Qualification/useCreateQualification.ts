import { useState } from "react";
import { useAuth } from "react-oidc-context";
import {createQualificationFromApi} from "../../services/qualificationService.ts";

export function useCreateQualification() {
    const auth = useAuth();

    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const createQualification = async (skill: string): Promise<boolean> => {
        setIsCreating(true);
        setCreateError(null);

        try {
            await createQualificationFromApi(skill, auth.user?.access_token);
            return true;
        } catch (error) {
            setCreateError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten");
            return false;
        } finally {
            setIsCreating(false);
        }
    };

    const clearCreateError = () => setCreateError(null);

    return {
        isCreating,
        createError,
        createQualification,
        clearCreateError,
    };
}
