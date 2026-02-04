import QualificationTable from "../components/QualificationTable.tsx";
import {Typography} from "@mui/joy";

export function QualificationsPage() {
    return (
        <>
            <Typography
                level="h3"
                sx={{mb: 2, ml: {xs: 3.5, md: 1}}}
                letterSpacing={'normal'}
            >
                Qualifikationsverwaltung
            </Typography>
            <QualificationTable/>
        </>
    )
}