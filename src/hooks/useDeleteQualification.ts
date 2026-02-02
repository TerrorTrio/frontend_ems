import {useState} from "react";
import {useAuth} from "react-oidc-context";
import {deleteQualificationFromApi} from "../services/qualificationService.ts";


export function useDeleteQualification(){
    const auth = useAuth();

    const [skillId, setSkillId] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const deleteQualification = async () => {
        if (skillId === null) {
            setDeleteError('Keine Qualifikation ausgewählt');
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);

        try {
            await deleteQualificationFromApi(skillId, auth.user?.access_token);
        } catch (deleteError) {
            setDeleteError(deleteError instanceof Error ? deleteError.message : 'Ein Fehler ist aufgetreten');
        } finally {
            setIsDeleting(false);
        }
    };
    return {
        skillId,
        setSkillId,
        isDeleting,
        deleteError,
        deleteQualification,
    };

}