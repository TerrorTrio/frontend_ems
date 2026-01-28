import Table from '@mui/joy/Table';
import {Card, Chip, IconButton} from "@mui/joy";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import RemoveRedEye from '@mui/icons-material/RemoveRedEyeOutlined';
import type {Employee} from "../types/employee.ts";

export default function EmployeeTable({employees}: {employees: Employee[]}) {
    return (
        <Card sx={{
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            width: '100%',
            mt: 2
        }}>
            <h4 style={{marginLeft: 2}}>Mitarbeiterliste ({employees.length} gefunden)</h4>
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
                {employees.map((employee : Employee) => (
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
                            <IconButton aria-label={"View employee details"}><RemoveRedEye/></IconButton>
                            <IconButton aria-label={"Deletes an employee"}><DeleteIcon color={"error"}/></IconButton>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Card>
    )
}