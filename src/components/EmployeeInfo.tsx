import type {Employee} from "../types/employee.ts";
import {Box, Card, FormControl, FormLabel, Input} from "@mui/joy";

interface EmployeeInfoProps {
    employee: Employee
}

export default function EmployeeInfo({employee} : EmployeeInfoProps) {
    return (
        <Card>
            <h4>Persönliche Daten</h4>
            <Box sx={{display: "flex", gap: 2}}>
                <FormControl>
                    <FormLabel>Vorname</FormLabel>
                    <Input value={employee.firstName} readOnly/>
                </FormControl>
                <FormControl>
                    <FormLabel>Nachname</FormLabel>
                    <Input value={employee.lastName} readOnly/>
                </FormControl>
            </Box>

            <h4>Kontaktdaten</h4>
            <FormControl>
                <FormLabel>Telefon</FormLabel>
                <Input value={employee.phone} readOnly />
            </FormControl>

            <h4>Adresse</h4>
            <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2}}>
                <FormControl>
                    <FormLabel>Straße</FormLabel>
                    <Input value={employee.street} readOnly />
                </FormControl>
                <FormControl>
                    <FormLabel>Postleitzahl</FormLabel>
                    <Input value={employee.postcode} readOnly />
                </FormControl>
                <FormControl>
                    <FormLabel>Stadt</FormLabel>
                    <Input value={employee.city} readOnly />
                </FormControl>
            </Box>
        </Card>
    )
}