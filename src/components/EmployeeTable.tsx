import Table from '@mui/joy/Table';
import {Button, Box, Card, Chip, IconButton, Typography} from "@mui/joy";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveRedEye from '@mui/icons-material/RemoveRedEyeOutlined';
import {useDeleteEmployee} from "../hooks/Employee/useDeleteEmployee.ts";
import {useNavigate} from "react-router-dom";
import {useDeleteDialog} from "../hooks/Dialogs/useDeleteDialog.tsx";
import {useEmployees} from "../context/EmployeeContext.tsx";
import {useEffect} from "react";
import type {Employee} from "../types/employee.ts";

export default function EmployeeTable() {
    const {filteredEmployees, loading, refetchEmployees} = useEmployees();
    const {deleteEmployee, deleting, deleteError} = useDeleteEmployee();
    const navigate = useNavigate();

    useEffect(() => {
        refetchEmployees();
    }, []);

    const {openDeleteDialog, DeleteDialog} = useDeleteDialog(async (id) => {
        await deleteEmployee(id);
    })

    if (loading) {
        return <div>Lade Mitarbeiter...</div>;
    }

    if (deleteError) {
        return <div> {deleteError} </div>
    }

    return (
        <Card sx={{
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            width: '100%',
            mt: 2
        }}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <h4 style={{marginLeft: 2}}>Mitarbeiterliste ({filteredEmployees.length} gefunden)</h4>
                <Button
                    sx={{
                        backgroundColor: "#258bf2",
                        fontWeight: "normal",
                        borderRadius: "10px",
                        width: { xs: "36px", sm: "auto" },
                        minWidth: { xs: "36px", sm: "unset" },
                        px: { xs: 1, sm: 2 },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {backgroundColor: "#0b80f1"},
                    }}
                    onClick={() => navigate("/employees/new")}
                >
                    <AddCircleOutlineIcon />
                    <Box component="span" sx={{ display: { xs: "none", sm: "inline" }, ml: 1 }}>
                        Mitarbeiter hinzufügen
                    </Box>
                </Button>
            </div>


            {/* Desktop Ansicht */}
            <Box sx={{display: {xs: 'none', md: 'block'}}}>
                <Table sx={{mt: 2, tableLayout: 'auto', width: '100%'}}
                       aria-label="Mitarbeiterliste"
                       hoverRow
                       stickyHeader>
                    <thead>
                    <tr>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>Ort</th>
                        <th>Qualifikationen</th>
                        <th style={{textAlign: 'right', whiteSpace: 'nowrap'}}>Aktionen</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredEmployees.map((employee: Employee) => (
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.city}</td>
                            <td>
                                {employee.skillSet.map(skill => (
                                    <Chip key={skill.id} sx={{mr: 3}}>{skill.skill}</Chip>
                                ))}
                            </td>
                            <td style={{textAlign: "right", whiteSpace: 'nowrap'}}>
                                <IconButton
                                    aria-label="View employee details"
                                    onClick={() => navigate(`/employees/${employee.id}`)}><RemoveRedEye/></IconButton>
                                <IconButton aria-label={"Deletes an employee"}
                                            onClick={() => openDeleteDialog(employee.id)}
                                            disabled={deleting}><DeleteIcon color={"error"}/></IconButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Box>

            {/* Mobile Ansicht */}
            <Box sx={{display: {xs: 'flex', md: 'none'}, flexDirection: 'column', gap: 2, mt: 2}}>
                {filteredEmployees.map((employee: Employee) => (
                    <Card
                        key={employee.id}
                        variant="outlined"
                        sx={{p: 2}}
                        onClick={() => navigate(`/employees/${employee.id}`)}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Box>
                                <Typography level="title-md">
                                    {employee.firstName} {employee.lastName}
                                </Typography>
                                <Typography level="body-sm" sx={{color: 'neutral.600'}}>
                                    {employee.city}
                                </Typography>
                            </Box>
                            <IconButton size="sm" aria-label="Deletes an employee"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openDeleteDialog(employee.id)
                                        }}
                                        disabled={deleting}>
                                <DeleteIcon color="error"/>
                            </IconButton>
                        </Box>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1}}>
                            {employee.skillSet.map(skill => (
                                <Chip key={skill.id} size="sm">{skill.skill}</Chip>
                            ))}
                        </Box>
                    </Card>
                ))}
            </Box>
            <DeleteDialog/>
        </Card>
    )
}