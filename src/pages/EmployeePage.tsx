import EmployeeTable from "../components/EmployeeTable.tsx";
import {SearchFilterPanel} from "../components/SearchFilterPanel/SearchFilterPanel.tsx";
import {Typography} from "@mui/joy";

export function EmployeePage() {
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
                Mitarbeiterübersicht
            </Typography>
            <SearchFilterPanel/>
            <EmployeeTable/>
        </>
    )
}