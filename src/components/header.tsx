import "../App.css";

export function Header() {
    return (
        <header className="header">
            <div className="brand">
        <span className="brand-logo" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="img">
            <rect x="3" y="7" width="18" height="13" rx="2" ry="2" />
            <path d="M9 7V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
            <path d="M3 11h18" />
            <path d="M12 11v2" />
          </svg>
        </span>
                <span className="brand-text">EMS-Backoffice</span>
            </div>

            <div className="header-actions">
                <button className="icon-btn user-btn" aria-label="Profil">
                    <svg viewBox="0 0 24 24" role="img">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c1.5-3 4.5-4.5 8-4.5s6.5 1.5 8 4.5" />
                    </svg>
                </button>
                <button className="icon-btn logout-btn" aria-label="Logout">
                    <svg viewBox="0 0 24 24" role="img">
                        <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" />
                        <path d="m15 9 4 3-4 3" />
                        <path d="M19 12H10" />
                    </svg>
                </button>
            </div>
        </header>
    );
}

export default Header;