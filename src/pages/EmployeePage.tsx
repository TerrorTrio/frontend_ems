import EmployeeTable from "../components/EmployeeTable.tsx";
import {SearchFilterPanel} from "../components/SearchFilterPanel/SearchFilterPanel.tsx";
import {Typography} from "@mui/joy";

export function EmployeePage() {
    return (
        <>
            <Typography
                level="h3"
                sx={{mb: 2, ml: {xs: 3.5, md: 1}}}
                letterSpacing={'normal'}
            >
                Mitarbeiterübersicht
            </Typography>
            <SearchFilterPanel/>
            <EmployeeTable/>
        </>
    )
}