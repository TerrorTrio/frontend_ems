import {Button, DialogActions, DialogContent, DialogTitle, Modal, ModalDialog} from "@mui/joy";
import {useState, useCallback, type ReactElement} from "react";


interface UseCancelDialogReturn {
    openCancelDialog: () => void;
    CancelDialog: () => ReactElement | null;
}

export function useCancelDialog(onConfirm: () => void) : UseCancelDialogReturn {
    const [open, setOpen] = useState(false);

    const openCancelDialog = useCallback(() => {
        setOpen(true);
    }, []);

    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CancelDialog = () => open ? (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>Änderungen verwerfen</DialogTitle>
                <DialogContent>Es sind Änderungen vorhanden, willst du wirklich abbrechen?</DialogContent>
                <DialogActions>
                    <Button variant="solid" color="danger" onClick={handleConfirm}>
                        Ja, Änderungen verwerfen
                    </Button>
                    <Button variant="plain" color="neutral" onClick={handleClose}>
                        Nein
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    ) : null;

    return {openCancelDialog, CancelDialog};
}
