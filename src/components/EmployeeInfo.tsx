import type {Employee} from "../types/employee.ts";
import {Autocomplete, Box, Card, createFilterOptions, FormControl, FormLabel, Input} from "@mui/joy";
import {parseStreet} from "../hooks/useStreetParser.ts";

interface EmployeeInfoProps {
    employee: Employee
}

export default function EmployeeInfo({employee} : EmployeeInfoProps) {
    const {streetName, houseNumber} = parseStreet(employee.street);

    const filterOptions = createFilterOptions(
        {
            matchFrom: "start",
            stringify: (option: { skill : string }) => option.skill
        }
    )

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

            <h4 style={{marginTop: 20}}>Kontaktdaten</h4>
            <FormControl>
                <FormLabel>Telefon</FormLabel>
                <Input value={employee.phone} readOnly />
            </FormControl>

            <h4 style={{marginTop: 20}}>Adresse</h4>
            <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2}}>
                <FormControl>
                    <FormLabel>Straße</FormLabel>
                    <Input value={streetName} readOnly />
                </FormControl>
                <FormControl>
                    <FormLabel>Hausnummer</FormLabel>
                    <Input value={houseNumber} readOnly />
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

            <h4 style={{marginTop: 20}}>Qualifikationen</h4>
            <FormControl>
                <Autocomplete
                    placeholder="Wähle eine Qualfikation aus"
                    options={qualifications}
                    getOptionLabel={(option) => option.skill}
                    filterOptions={filterOptions}
                />
            </FormControl>
        </Card>
    )
}

const qualifications = [
    {id: 1, skill: "Java"},
    {id: 2, skill: "Angular"},
    {id: 3, skill: "Scrum"},
    {id: 4, skill: "Scuam"}
]