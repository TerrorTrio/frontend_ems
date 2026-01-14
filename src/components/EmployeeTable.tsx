import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useEffect, useState} from "react";
import {Container} from "react-bootstrap";
import Table from '@mui/joy/Table';
import {Chip, IconButton} from "@mui/joy";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEye from '@mui/icons-material/RemoveRedEyeOutlined';
import type {Employee} from "../types/employee.ts";

export default function EmployeeTable() {
    const {fetchEmployees, loading, error} = useEmployeeApi();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees().then(data => setEmployees(data)).catch(err => console.error(err));
    }, [])

    if (loading) {
        return <div>Lade Mitarbeiter...</div>;
    }

    if (error) {
        return <div> {error}</div>;
    }

    return (
        <Container>
            <Table sx={{mt: 2}}
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
                    <th>Aktionen</th>
                </tr>
                </thead>

                <tbody>
                {employees.map((employee : Employee) => (
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.city}</td>
                        <td>{employee.skillSet.map(skill => (
                            <Chip key={skill.id} sx={{mr: 1}}>{skill.skill}</Chip>
                        ))}</td>
                        <td>
                            <IconButton aria-label={"View employee details"}><RemoveRedEye/></IconButton>
                            <IconButton aria-label={"Deletes an employee"}><DeleteIcon color={"error"}/></IconButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}