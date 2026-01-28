import EmployeeInfo from "../components/EmployeeInfo.tsx";
import {useParams} from "react-router-dom";
import {useFetchSingleEmployee} from "../hooks/useFetchSingleEmployee.ts";

export function EmployeeDetailPage() {
    const {id} = useParams<{id: string}>();
    const {refetch, employee, loading, error} = useFetchSingleEmployee(Number(id));

    if (loading) {
        return <div>Lade Mitarbeiter...</div>;
    }

    if (error) {
        return <div> {error}</div>;
    }

    if (!employee) {
        return <div>Mitarbeiter nicht gefunden</div>
    }

    return (
        <>
        <h1>Mitarbeiterdetails</h1>
        <EmployeeInfo employee={employee} onUpdate={refetch}/>
        </>
    )
}