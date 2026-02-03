import { useAuth } from "react-oidc-context";

export function useLogout() {
    const auth = useAuth();
    return () => {
        auth.removeUser();
        auth.signoutRedirect();
    };
}