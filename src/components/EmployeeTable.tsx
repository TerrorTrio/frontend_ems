import Table from '@mui/joy/Table';
import {Button, Card, Chip, IconButton} from "@mui/joy";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveRedEye from '@mui/icons-material/RemoveRedEyeOutlined';
import {useDeleteEmployee} from "../hooks/Employee/useDeleteEmployee.ts";
import {useNavigate} from "react-router-dom";
import {useDeleteDialog} from "../hooks/Dialogs/useDeleteDialog.tsx";
import {useEmployees} from "../context/EmployeeContext.tsx";
import {useEffect} from "react";

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
            <div style={{display:"flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <h4 style={{marginLeft: 2}}>Mitarbeiterliste ({filteredEmployees.length} gefunden)</h4>
                <Button sx={{
                    minHeight: '40px',
                    width: '14vw',
                    fontWeight: "normal",
                    fontSize: "13px",
                    backgroundColor: "#258bf2",
                    borderRadius: "10px",
                    "&:hover": {backgroundColor: "#0b80f1"},}}
                        onClick={() => navigate(`/employees/new`)}>
                    <AddCircleOutlineIcon style={{fontSize: "22", paddingRight: "5px"}}/> Mitarbeiter hinzufügen
                </Button>
            </div>

            <Table sx={{
                mt: 4,
                tableLayout: 'auto',
                width: '100%'
            }}
                   aria-label={"Mitarbeiterliste"}
                   hoverRow
                   stickyHeader
            >
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
                {filteredEmployees.map((employee) => (
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
                            <IconButton aria-label={"Deletes an employee"} onClick={() => openDeleteDialog(employee.id)}
                                        disabled={deleting}><DeleteIcon color={"error"}/></IconButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <DeleteDialog/>
        </Card>
    )
}