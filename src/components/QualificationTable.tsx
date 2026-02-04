import {useFetchQualifications} from "../hooks/Qualification/useFetchQualifications.ts";
import {useDeleteQualification} from "../hooks/Qualification/useDeleteQualification.ts";
import {useUpdateQualification} from "../hooks/Qualification/useUpdateQualification.ts";
import {useCreateQualification} from "../hooks/Qualification/useCreateQualification.ts";
import Table from "@mui/joy/Table";
import {Button, Card, Chip, DialogActions, DialogContent, DialogTitle, IconButton, Input, Modal, ModalDialog} from "@mui/joy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import {useState} from "react";
import {useDeleteDialog} from "../hooks/Dialogs/useDeleteDialog.tsx";

export default function QualificationTable() {
    const {skills, loadingQualifications, fetchQualificationError, fetchQualifications} = useFetchQualifications();
    const {deleteQualification, isDeleting, deleteError, clearError} = useDeleteQualification();
    const {updateQualification, isUpdating} = useUpdateQualification();
    const {createQualification, isCreating} = useCreateQualification();

    // Suchfunktion
    const [searchValue, setSearchValue] = useState("");

    const filteredSkills = skills.filter(skill => skill.skill.toLowerCase().includes(searchValue.trim().toLowerCase()));

    // Edit Modal State
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<{ id: number; skill: string } | null>(null);
    const [editValue, setEditValue] = useState("");

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [newSkillValue, setNewSkillValue] = useState("");

    const handleEditClick = (skill: { id: number; skill: string }) => {
        setEditingSkill(skill);
        setEditValue(skill.skill);
        setEditModalOpen(true);
    };

    const handleEditSave = async () => {
        if (!editingSkill) return;

        const result = await updateQualification(editingSkill.id, editValue);
        if (result) {
            await fetchQualifications();
            setEditModalOpen(false);
            setEditingSkill(null);
        }
    };

    const handleEditCancel = () => {
        setEditModalOpen(false);
        setEditingSkill(null);
        setEditValue("");
    };

    const handleAddSave = async () => {
        const result = await createQualification(newSkillValue);
        if (result) {
            await fetchQualifications();
            setAddModalOpen(false);
            setNewSkillValue("");
        }
    };

    const handleAddCancel = () => {
        setAddModalOpen(false);
        setNewSkillValue("");
    };

    const {openDialog, Dialog} = useDeleteDialog(async (id) => {
        await deleteQualification(id);
        await fetchQualifications();
    });

    if (loadingQualifications) {
        return <div>Lade Qualifikationen...</div>;
    }

    if (fetchQualificationError) {
        return <div>{fetchQualificationError}</div>;
    }

    return (
        <>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16}}>
                <Input
                    placeholder="Qualifikation suchen..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    sx={{width: 300}}
                />
                <Button
                    startDecorator={<AddCircleOutlineIcon/>}
                    sx={{
                        backgroundColor: "#258bf2",
                        fontWeight: "normal",
                    }}
                    onClick={() => setAddModalOpen(true)}
                >
                    Qualifikation hinzufügen
                </Button>
            </div>
            <>
                {/* Add Modal */}
                <Modal open={addModalOpen} onClose={handleAddCancel}>
                    <ModalDialog>
                        <DialogTitle>Neue Qualifikation</DialogTitle>
                        <DialogContent>
                            <Input
                                autoFocus
                                value={newSkillValue}
                                onChange={(e) => setNewSkillValue(e.target.value)}
                                placeholder="Bezeichnung"
                                sx={{mt: 1}}/>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="solid"
                                color="primary"
                                onClick={handleAddSave}
                                loading={isCreating}
                                disabled={!newSkillValue.trim()}
                            >
                                Erstellen
                            </Button>
                            <Button variant="plain" color="neutral" onClick={handleAddCancel}>
                                Abbrechen
                            </Button>
                        </DialogActions>
                    </ModalDialog>
                </Modal>
                {/* Error Modal */}
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
                {/* Edit Modal */}
                <Modal open={editModalOpen} onClose={handleEditCancel}>
                    <ModalDialog>
                        <DialogTitle>Qualifikation bearbeiten</DialogTitle>
                        <DialogContent>
                            <Input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                placeholder="Bezeichnung"
                                sx={{mt: 1}}/>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="solid"
                                color="primary"
                                onClick={handleEditSave}
                                loading={isUpdating}
                                disabled={!editValue.trim()}
                            >
                                Speichern
                            </Button>
                            <Button variant="plain" color="neutral" onClick={handleEditCancel}>
                                Abbrechen
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
                        Aktuelle Qualifikationen ({filteredSkills.length} gefunden)
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
                        {filteredSkills.map((skill) => (
                            <tr key={skill.id}>
                                <td>{skill.id}</td>
                                <td><Chip sx={{mr: 3}}>{skill.skill}</Chip>
                                </td>
                                <td style={{textAlign: "right", whiteSpace: "nowrap"}}>
                                    <IconButton
                                        aria-label="Edit qualification"
                                        disabled={isUpdating}
                                        onClick={() => handleEditClick(skill)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton
                                        aria-label="Delete qualification"
                                        disabled={isDeleting}
                                        onClick={() => openDialog(skill.id)}
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
            <Dialog/>
        </>
    );
}
