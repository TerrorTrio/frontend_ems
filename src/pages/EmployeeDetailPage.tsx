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
                sx={{
                    mb: 2,
                    ml: {xs: 3.5, md: 0},
                    fontWeight: "bold",
                    fontSize: {xs: "1.5rem", md: "1.8rem"}
                }}
                letterSpacing={'1'}
            >
                Mitarbeiterdetails
            </Typography>
            <EmployeeInfo employee={employee} onUpdate={refetch}/>
        </>
    )
}