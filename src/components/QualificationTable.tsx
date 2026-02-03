import {useFetchQualifications} from "../hooks/useFetchQualifications";
import {useDeleteQualification} from "../hooks/useDeleteQualification";
import {useUpdateQualification} from "../hooks/useUpdateQualification";
import Table from "@mui/joy/Table";
import {Button, Card, Chip, DialogActions, DialogContent, DialogTitle, IconButton, Modal, ModalDialog} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

export default function QualificationTable() {
    const {skills, loadingQualifications, fetchQualificationError, fetchQualifications} = useFetchQualifications();
    const {deleteQualification, isDeleting, deleteError, clearError} = useDeleteQualification();
    const {updateQualification, isUpdating} = useUpdateQualification();

    if (loadingQualifications) {
        return <div>Lade Qualifikationen...</div>;
    }

    if (fetchQualificationError) {
        return <div>{fetchQualificationError}</div>;
    }

    return (
        <>
            <Modal open={!!deleteError} onClose={clearError}>
                <ModalDialog color="danger" variant="soft">
                    <DialogTitle>
                        Löschen fehlgeschlagen
                    </DialogTitle>
                    <DialogContent>
                        {deleteError}
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={clearError}>
                            Schließen
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
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
                    aria-label="Qualifikationsliste"
                    hoverRow
                    stickyHeader
                >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Bezeichnung</th>
                        <th style={{textAlign: "right", whiteSpace: "nowrap"}}>Aktionen</th>
                    </tr>
                    </thead>

                    <tbody>
                    {skills.map((skill) => (
                        <tr key={skill.id}>
                            <td>{skill.id}</td>

                            <td>
                                <Chip sx={{mr: 3}}>{skill.skill}</Chip>
                            </td>

                            <td style={{textAlign: "right", whiteSpace: "nowrap"}}>
                                <IconButton
                                    aria-label="Edit qualification"
                                    disabled={isUpdating}
                                    onClick={async () => {


                                        // Update ausführen
                                        const result = await updateQualification(skill.id, skill.skill);

                                        // Wenn erfolgreich → Liste neu laden
                                        if (result) {
                                            await fetchQualifications();
                                        }
                                    }}
                                >
                                    <EditIcon/>
                                </IconButton>

                                <IconButton
                                    aria-label="Delete qualification"
                                    disabled={isDeleting}
                                    onClick={async () => {
                                        await deleteQualification(skill.id);
                                        await fetchQualifications();
                                    }}
                                >
                                    <DeleteIcon color="error"/>
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Card>
        </>
    );
}
