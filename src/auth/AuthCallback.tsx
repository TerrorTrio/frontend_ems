import {useAuth} from "react-oidc-context";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

type RedirectState = {
    returnTo: string;
};

export default function AuthCallback() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated && auth.user) {
            const state = auth.user.state as RedirectState | undefined;

            navigate(state?.returnTo ?? "/", { replace: true });        }
    }, [auth.isAuthenticated, auth.user, navigate]);

    return <div>Login wird abgeschlossen…</div>;
}
