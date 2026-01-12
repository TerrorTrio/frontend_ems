import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useState} from "react";
import {Button, Container} from "react-bootstrap";
import Table from '@mui/joy/Table';
import {Chip, IconButton} from "@mui/joy";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEye from '@mui/icons-material/RemoveRedEyeOutlined';

export default function EmployeeTable() {
    const {fetchEmployees, loading, error} = useEmployeeApi();
    const [employees, setEmployees] = useState([]);

    const handleLoadEmployees = () => {
        fetchEmployees().then(data => setEmployees(data)).catch(err => console.error(err));
        console.log(employees);
    }

    if (loading) {
        return <div>Lade Mitarbeiter...</div>;
    }

    if (error) {
        return <div> {error}</div>;
    }

    return (
        <Container>
            <Button onClick={handleLoadEmployees}>
                Mitarbeiter laden
            </Button>
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
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.city}</td>
                        <td>{employee.skillSet.map(skill => (
                            <Chip key={skill.id} sx={{mr: 1}}>{skill.skill}</Chip>
                        ))}</td>
                        <td>
                            <IconButton><RemoveRedEye sx={{mr: 2}}/></IconButton>
                            <IconButton><DeleteIcon color={"error"}/></IconButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}