import {useFetchQualifications} from "../hooks/useFetchQualifications";
import {useDeleteQualification} from "../hooks/useDeleteQualification";
import Table from "@mui/joy/Table";
import {Card, Chip, IconButton} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";

export default function QualificationTable() {
    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();
    const {skillId, setSkillId, isDeleting, deleteError, deleteQualification} = useDeleteQualification();

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
            <h3 style={{marginLeft: 2}}>
                Aktuelle Qualifikationen ({skills.length} gefunden)
            </h3>

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
                    <th>Aktionen</th>
                </tr>
                </thead>

                <tbody>
                {skills.map((skill) => (
                    <tr key={skill.id}>
                        <td>{skill.id}</td>
                        <td>
                            <Chip sx={{mr: 3}}>{skill.skill}</Chip>
                        </td>
                        <td>

                            {/*<button*/}
                            {/*    disabled={isDeleting}*/}
                            {/*    onClick={() => {*/}
                            {/*        setSkillId(skill.id);*/}
                            {/*        deleteQualification();*/}
                            {/*    }}>*/}
                            {/*    Löschen*/}
                            {/*</button>*/}

                            {/*<Button*/}
                            {/*    // variant="solid"*/}
                            {/*    // color="danger"*/}
                            {/*    // size="sm"*/}
                            {/*    startDecorator={<DeleteIcon />}*/}
                            {/*    disabled={isDeleting}*/}
                            {/*    onClick={async () => {*/}
                            {/*        setSkillId(skill.id);*/}
                            {/*        await deleteQualification();*/}
                            {/*        // fetchQualifications(); // Liste neu laden*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Löschen*/}
                            {/*</Button>*/}

                            <IconButton
                                variant="outlined"
                                color="danger"
                                size="sm"
                                onClick={() => {
                                    setSkillId(skill.id);
                                    deleteQualification();
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>


                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    );
}
