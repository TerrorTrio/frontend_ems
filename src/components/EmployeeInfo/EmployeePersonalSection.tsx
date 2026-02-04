import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {Box, FormControl, FormHelperText, FormLabel, Input} from "@mui/joy";

interface EmployeePersonalSectionProps {
    isEditing: boolean,
    value: Pick<EmployeeFormData, "firstName" | "lastName">,
    onChange: (field: "firstName" | "lastName", value: string) => void;
}

export function EmployeePersonalSection({isEditing, value, onChange}: EmployeePersonalSectionProps) {
    const firstNameEmpty = value.firstName.trim() === "";
    const lastNameEmpty = value.lastName.trim() === "";

    return (
        <>
            <h5>Persönliche Daten</h5>
            <Box sx={{display: "flex", gap: 2, flexDirection: {xs: "column", md: "row"}}}>
                <FormControl sx={{flex: 1}} error={isEditing && firstNameEmpty}>
                    <FormLabel>Vorname</FormLabel>
                    <Input
                        value={value.firstName}
                        onChange={(event) => onChange("firstName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                    {isEditing && firstNameEmpty && (
                        <FormHelperText>Vorname ist erforderlich</FormHelperText>
                    )}
                </FormControl>
                <FormControl sx={{flex: 1}} error={isEditing && lastNameEmpty}>
                    <FormLabel>Nachname</FormLabel>
                    <Input
                        value={value.lastName}
                        onChange={(event) => onChange("lastName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                    {isEditing && lastNameEmpty && (
                        <FormHelperText>Nachname ist erforderlich</FormHelperText>
                    )}
                </FormControl>
            </Box>
        </>
    )
}