import {Box, Button} from "@mui/joy";

interface SaveEmployeeActionsBarProps {
    onCancel: () => void,
    onSave: () => void,
    saving?: boolean,
    isFormValid: boolean,
}

export function SaveEmployeeActionsBar({onCancel, onSave, saving, isFormValid}: SaveEmployeeActionsBarProps) {
    return (
        <>
            <Box sx={{display: "flex", gap: 2, justifyContent: "flex-end"}}>
                <>
                    <Button color="neutral" variant="outlined" onClick={onCancel}>Abbrechen</Button>
                    <Button color="primary" onClick={onSave} loading={saving} disabled={!isFormValid}>Speichern</Button>
                </>
            </Box>
        </>
    )
}