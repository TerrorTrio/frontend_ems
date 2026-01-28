import { useFetchQualifications } from "../hooks/useFetchQualifications";
import Table from "@mui/joy/Table";
import { Card, Chip } from "@mui/joy";

export default function QualificationTable() {
    const { skills, loadingQualifications, fetchQualificationError } = useFetchQualifications();

    if (loadingQualifications) {
        return <div>Lade Qualifikationen...</div>;
    }

    if (fetchQualificationError) {
        return <div>{fetchQualificationError}</div>;
    }

    return (
        <Card
            sx={{
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
                width: "100%",
                mt: 2,
            }}
        >
            <h4 style={{ marginLeft: 2 }}>
               Aktuelle Qualifikationen ({skills.length} gefunden)
            </h4>

            <Table
                sx={{
                    mt: 4,
                    tableLayout: "auto",
                    width: "100%",
                }}
                aria-label={"Qualifikationsliste"}
                hoverRow
                stickyHeader
            >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Bezeichnung</th>
                </tr>
                </thead>

                <tbody>
                {skills.map((skill) => (
                    <tr key={skill.id}>
                        <td>{skill.id}</td>
                        <td>
                            <Chip sx={{ mr: 3 }}>{skill.skill}</Chip>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    );
}
