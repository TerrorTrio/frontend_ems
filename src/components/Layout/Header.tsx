import type {ReactNode} from "react";

export function Header() {
    const iconBtnBaseStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        transition: "transform 120ms ease, boxShadow 120ms ease",
    };

    const svgBaseStyle = {
        width: "18px",
        height: "18px",
        fill: "none",
        stroke: "#fff",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round",
    } as const;

    const buttonColors: Record<string, { bg: string; shadow: string }> = {
        user: {bg: "#1a33b2", shadow: "rgba(31, 90, 246, 0.25)"},
        logout: {bg: "#3b4b5f", shadow: "rgba(59, 75, 95, 0.25)"},
    };

    return (
        <header style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            background: "#F8F8F8FF",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            gap: "12px",
        }}>
            <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                color: "#1A33B2FF",
                fontWeight: 700,
                fontSize: "16px",
                userSelect: "none",
            }}>
                <span style={{
                    display: "inline-flex",
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    background: "#1A33B2FF",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    userSelect: "none",
                }} aria-hidden="true">
                    <svg style={{
                        width: "100%",
                        height: "100%",
                        stroke: "#ffffff",
                        fill: "none",
                        strokeWidth: 1.8,
                    }}
                         viewBox="0 0 24 24" role="img">
                        <rect x="3" y="7" width="18" height="13" rx="2" ry="2"/>
                        <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"/>
                        <path d="M3 11h18"/>
                        <path d="M12 11v2"/>
                    </svg>
                </span>
                <span className="brand-text">EMS-Backoffice</span>
            </div>

            <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
            }}>
                <div style={{display: "inline-flex", gap: "10px"}}>
                    <IconButton type="user" ariaLabel="Profil">
                        <svg viewBox="0 0 24 24" role="img" style={svgBaseStyle}>
                            <circle cx="12" cy="8" r="4"/>
                            <path d="M4 20c1.5-3 4.5-4.5 8-4.5s6.5 1.5 8 4.5"/>
                        </svg>
                    </IconButton>

                    <IconButton type="logout" ariaLabel="Logout">
                        <svg viewBox="0 0 24 24" role="img" style={svgBaseStyle}>
                            <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"/>
                            <path d="m15 9 4 3-4 3"/>
                            <path d="M19 12H10"/>
                        </svg>
                    </IconButton>
                </div>
            </div>
        </header>
    );

    function IconButton({
                            type,
                            ariaLabel,
                            children,
                        }: {
        type: "user" | "logout";
        ariaLabel: string;
        children: ReactNode;
    }) {
        const colors = buttonColors[type];

        return (
            <button
                aria-label={ariaLabel}
                style={{...iconBtnBaseStyle, backgroundColor: colors.bg}}
                onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.transform = "translateY(-1px)";
                    el.style.boxShadow = `0 4px 10px ${colors.shadow}`;
                }}
                onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.transform = "none";
                    el.style.boxShadow = "none";
                }}
            >
                {children}
            </button>
        );
    }
}

export default Header;