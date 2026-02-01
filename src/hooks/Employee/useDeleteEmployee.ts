import {removeEmployeeFromApi} from "../../services/employeeService.ts";
import {useAuth} from "react-oidc-context";
import {useState} from "react";


export function useDeleteEmployee() {

    const auth = useAuth();

    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);


    const deleteEmployee = async (employeeId: number) => {
        setDeleting(true);
        setDeleteError(null);

        try {
            await removeEmployeeFromApi({
                accessToken: auth.user?.access_token,
                employeeId: employeeId
            });
        } catch (error) {
            setDeleteError(error instanceof Error ? error.message : "Ein Fehler ist aufgetreten");
        } finally {
            setDeleting(false);
        }
    };


    return {deleteEmployee, deleting, deleteError};
}