import EmployeeInfo from "../components/EmployeeInfo/EmployeeInfo.tsx";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/joy";
import {useFetchSingleEmployee} from "../hooks/Employee/useFetchSingleEmployee.ts";

export function EmployeeDetailPage() {
    const {id} = useParams<{ id: string }>();
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
            <Typography
                level="h3"
                sx={{mb: 2, ml: {xs: 3.5, md: 1}}}
                letterSpacing={1}
            >
                Mitarbeiterdetails
            </Typography>
            <EmployeeInfo employee={employee} onUpdate={refetch}/>
        </>
    )
}