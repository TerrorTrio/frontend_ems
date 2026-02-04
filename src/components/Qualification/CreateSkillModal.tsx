import {Button, DialogActions, DialogContent, DialogTitle, Input, Modal, ModalDialog} from "@mui/joy";
import * as React from "react";

export function createSkillModal(addModalOpen: boolean, handleAddCancel: () => void, newSkillValue: string, setNewSkillValue: React.Dispatch<React.SetStateAction<string>>, handleAddSave: () => Promise<void>, isCreating: boolean) {
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