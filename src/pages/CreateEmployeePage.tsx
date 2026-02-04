import {CreateEmployee} from "../components/EmployeeInfo/CreateEmployee.tsx";
import {Typography} from "@mui/joy";

export function CreateEmployeePage() {
    return (
        <>
            <Typography
                level="h3"
                sx={{mb: 2, ml: {xs: 3.5, md: 0}}}
                letterSpacing={1}
            >
                Mitarbeiter hinzufügen
            </Typography>
            <CreateEmployee/>
        </>
    )
}