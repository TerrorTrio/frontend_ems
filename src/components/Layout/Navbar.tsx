import {NavLink} from "react-router-dom";
import GroupIcon from '@mui/icons-material/GroupOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import * as React from "react";
import {useState} from "react";
import {IconButton, Drawer, Box} from "@mui/joy";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

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

    const navContent = (
        <nav style={{display: "block"}}>
            <ul style={{listStyle: "none", margin: 0, padding: 0}}>
                {links.map((link) => (
                    <li key={link.to}>
                        <NavLink
                            to={link.to}
                            onClick={() => setMobileOpen(false)}
                            style={({isActive}) => ({
                                ...navLinkStyle,
                                color: isActive ? "#1A33D2FF" : "#4a5568",
                            })}
                        >
                            {link.icon}
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );

    return (
        <>
            <Box
                sx={{
                    display: {xs: 'flex', md: 'none'},
                    position: 'fixed',
                    top: 65,
                    left: 16,
                    zIndex: 1200,
                }}
            >
                <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={() => setMobileOpen(true)}
                    aria-label={"Open navigation menu"}
                >
                    <MenuIcon/>
                </IconButton>
            </Box>

            <Drawer
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{display: {xs: 'block', md: 'none'}}}
                size={"sm"}
            >
                <Box sx={{padding: "12px"}}>
                    <Box sx={{display: 'flex', justifyContent: 'flex-start', mb: 1}}>
                        <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={() => setMobileOpen(false)}
                            aria-label={"Close navigation menu"}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    {navContent}
                </Box>
            </Drawer>

            <Box
                component="aside"
                sx={{
                    display: {xs: 'none', md: 'flex'},
                    width: 220,
                    background: "#f2f2f2",
                    borderRight: "1px solid #d7dce2",
                    boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
                    padding: "16px 12px",
                    flexDirection: "column",
                }}
            >
                {navContent}
            </Box>
        </>
    );
}
