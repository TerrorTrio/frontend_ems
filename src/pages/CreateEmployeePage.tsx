import {CreateEmployee} from "../components/EmployeeInfo/CreateEmployee.tsx";
import {Typography} from "@mui/joy";

export function CreateEmployeePage() {
    return (
        <>
            <Typography
                sx={{
                    mb: 2,
                    ml: {xs: 3.5, md: 0},
                    fontWeight: {xs: "normal", md: "bold"},
                    fontSize: {xs: "1.5rem", md: "1.8rem"}
                }}
                letterSpacing={'1'}
            >
                Mitarbeiter hinzufügen
            </Typography>
            <CreateEmployee/>
        </>
    )
}