import {useAuth} from "react-oidc-context";
import {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";

export default function RequireAuth() {
    const auth = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!auth.isLoading && !auth.isAuthenticated && !auth.activeNavigator) {
            auth.signinRedirect({
                state: {
                    returnTo: location.pathname + location.search
                }
            });
        }
    }, [auth, location]);

    if (auth.isLoading) {
        return <div>Laden...</div>;
    }

    if (auth.error) {
        return <div>Fehler: {auth.error.message}</div>;
    }

    if (!auth.isAuthenticated) {
        return <div>Weiterleitung zur Anmeldung...</div>;
    }

    return <Outlet />
}