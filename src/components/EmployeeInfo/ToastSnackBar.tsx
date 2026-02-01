import type {ToastState} from "../../types/employeeFormData.ts";
import {Snackbar} from "@mui/joy";

interface ToastSnackBarProps {
    toast: ToastState,
    onClose: () => void
}

export function ToastSnackBar({toast, onClose}: ToastSnackBarProps) {
    return (
        <>
            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={onClose}
                color={toast.color}
                variant="soft"
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                {toast.message}
            </Snackbar>
        </>
    )
}