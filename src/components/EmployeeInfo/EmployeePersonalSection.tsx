import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {Box, FormControl, FormLabel, Input} from "@mui/joy";

interface EmployeePersonalSectionProps {
    isEditing: boolean,
    value: Pick<EmployeeFormData, "firstName" | "lastName">,
    onChange: (field: "firstName" | "lastName", value: string) => void;
}

export function EmployeePersonalSection({isEditing, value, onChange}: EmployeePersonalSectionProps) {
    return (
        <>
            <h5>Persönliche Daten</h5>
            <Box sx={{display: "flex", gap: 2}}>
                <FormControl sx={{flex: 1}}>
                    <FormLabel>Vorname</FormLabel>
                    <Input
                        value={value.firstName}
                        onChange={(event) => onChange("firstName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl sx={{flex: 1}}>
                    <FormLabel>Nachname</FormLabel>
                    <Input
                        value={value.lastName}
                        onChange={(event) => onChange("lastName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
            </Box>
        </>
    )
}