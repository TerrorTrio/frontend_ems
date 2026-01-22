import { NavLink } from "react-router-dom";
import GroupIcon from '@mui/icons-material/GroupOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import "../App.css";

export default function Navbar() {
    return (
        <aside className="sidebar">
            <nav className="nav">
                <ul className="nav-list">
                    <li className="menue-item">
                        <NavLink to="/employees" className="nav-link">
                            <GroupIcon/>Mitarbeiter
                        </NavLink>
                    </li>
                    <li className="menue-item">
                        <NavLink to="/qualifications" className="nav-link">
                            <WorkspacePremiumIcon/>Qualifikationen
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}