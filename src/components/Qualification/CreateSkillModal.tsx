import {Button, DialogActions, DialogContent, DialogTitle, Input, Modal, ModalDialog} from "@mui/joy";

export function createSkillModal(addModalOpen: boolean, handleAddCancel: () => void, newSkillValue: string, setNewSkillValue: (value: (((prevState: string) => string) | string)) => void, handleAddSave: () => Promise<void>, isCreating: boolean) {
    return <Modal open={addModalOpen} onClose={handleAddCancel}>
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
    </Modal>;
}