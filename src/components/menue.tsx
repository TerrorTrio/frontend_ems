import { NavLink } from "react-router-dom";
import "../App.css";

export default function Menue() {
    return (
        <aside className="sidebar">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="menue-item">
                        <NavLink to="/employees" className="nav-link">
                            Mitarbeiter
                        </NavLink>
                    </li>
                    <li className="menue-item">
                        <NavLink to="/qualifications" className="nav-link">
                            Qualifikationen
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}