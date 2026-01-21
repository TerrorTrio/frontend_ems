import { useAuth } from "react-oidc-context";
import { useEffect, type ReactNode } from "react";

interface RequireAuthProps {
    children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated && !auth.activeNavigator) {
            auth.signinRedirect();
        }
    }, [auth.isLoading, auth.isAuthenticated, auth.activeNavigator]);

    if (auth.isLoading) {
        return <div>Laden...</div>;
    }

    if (auth.error) {
        return <div>Fehler: {auth.error.message}</div>;
    }

    if (!auth.isAuthenticated) {
        return <div>Weiterleitung zur Anmeldung...</div>;
    }

    return <>{children}</>;
}
