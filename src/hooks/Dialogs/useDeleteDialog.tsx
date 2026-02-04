import {Button, DialogActions, DialogContent, DialogTitle, Modal, ModalDialog} from "@mui/joy";
import {useState, useCallback, type ReactElement} from "react";

interface UseDeleteDialogReturn {
    openDialog: (id: number) => void;
    Dialog: () => ReactElement | null;
}

export function useDeleteDialog(onConfirm: (id: number) => Promise<void>): UseDeleteDialogReturn {
    const [open, setOpen] = useState(false);
    const [itemId, setItemId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const openDialog = useCallback((id: number) => {
        setItemId(id);
        setOpen(true);
    }, []);

    const handleConfirm = async () => {
        if (itemId === null) {
            return;
        }

        setLoading(true);

        try {
            await onConfirm(itemId);
            setOpen(false);
            setItemId(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setItemId(null);
    };

    const Dialog = () => open ? (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>Mitarbeiter löschen</DialogTitle>
                <DialogContent>Möchtest du diesen Mitarbeiter wirklich löschen?</DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={handleConfirm} loading={loading}>
                        Löschen
                    </Button>
                    <Button variant="plain" color="neutral" onClick={handleClose}>
                        Abbrechen
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    ) : null;

    return {openDialog, Dialog};
}
