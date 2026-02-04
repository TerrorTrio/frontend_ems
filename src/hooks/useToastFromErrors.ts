import {useEffect} from "react";
import type {ToastState} from "../types/toast.ts";

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