import QualificationTable from "../components/QualificationTable.tsx";
import {Typography} from "@mui/joy";

export function QualificationsPage() {
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
                Qualifikationsverwaltung
            </Typography>
            <QualificationTable/>
        </>
    )
}