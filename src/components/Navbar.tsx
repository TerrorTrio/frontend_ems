import {NavLink} from "react-router-dom";
import GroupIcon from '@mui/icons-material/GroupOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import * as React from "react";
import {useState} from "react";

export default function Navbar() {
    const [activeLink, setActiveLink] = useState<string>("/employees");

    const navLinkStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        color: "#4a5568",
        textDecoration: "none",
        transition: "background 0.15s ease, color 0.15s ease",
    };

    const links = [
        {to: "/employees", label: "Mitarbeiter", icon: <GroupIcon/>},
        {to: "/qualifications", label: "Qualifikationen", icon: <WorkspacePremiumIcon/>},
    ];

    return (
        <aside
            style={{
                width: 220,
                background: "#f2f2f2",
                borderRight: "1px solid #d7dce2",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
                padding: "16px 12px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <nav style={{display: "block"}}>
                <ul style={{listStyle: "none", margin: 0, padding: 0}}>
                    {links.map((link) => {
                        const isActive = activeLink === link.to;
                        return (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    style={{
                                        ...navLinkStyle,
                                        color: isActive ? "#1A33D2FF" : "#4a5568",
                                    }}
                                    onClick={() => setActiveLink(link.to)}
                                >
                                    {link.icon}
                                    {link.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}