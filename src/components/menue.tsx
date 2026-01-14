import { NavLink } from "react-router-dom";
import "../App.css";

export default function Menue() {
    return (
        <aside className="sidebar">
            <nav className="menue">
                <ul className="menue-list">
                    <li className="menue-item">
                        <NavLink to="/employees" className="menue-link">
                            Mitarbeiter
                        </NavLink>
                    </li>
                    <li className="menue-item">
                        <NavLink to="/qualifications" className="menue-link">
                            Qualifikationen
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}