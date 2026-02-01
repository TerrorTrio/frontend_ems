import {Box, Button} from "@mui/joy";

interface EmployeeActionsBarProps {
    isEditing: boolean,
    deleting: boolean,
    updating: boolean,
    onDelete: () => void,
    onGoBack: () => void,
    onEdit: () => void,
    onCancel: () => void,
    onSave: () => void
}

export function EmployeeActionsBar({isEditing, deleting, updating, onDelete, onGoBack, onEdit, onCancel, onSave}: EmployeeActionsBarProps) {
    return(
        <>
            <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 3}}>
                <Button
                    color="danger"
                    onClick={onDelete}
                    loading={deleting}
                >
                    Löschen
                </Button>

                <Box sx={{display: "flex", gap: 2}}>
                    {isEditing ? (
                        <>
                            <Button color="neutral" variant="outlined" onClick={onCancel}
                                    disabled={updating}>Abbrechen</Button>
                            <Button color="primary" onClick={onSave} loading={updating}>Speichern</Button>
                        </>
                    ) : (
                        <>
                            <Button color="neutral" onClick={onGoBack}>Zurück</Button>
                            <Button color="primary" onClick={onEdit}>Bearbeiten</Button>
                        </>
                    )}
                </Box>
            </Box>
        </>
    )
}