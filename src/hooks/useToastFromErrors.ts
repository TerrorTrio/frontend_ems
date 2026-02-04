import {useEffect} from "react";

export type ToastState = { open: boolean; message: string; color: "danger" | "success" };

export function useToastFromErrors(
    errors: Array<string | undefined | null>,
    setToast: (next: ToastState) => void
) {
    useEffect(() => {
        const firstError = errors.find(Boolean);
        if (firstError) {
            setToast({open: true, message: String(firstError), color: "danger"});
        }
    }, [errors, setToast]);
}