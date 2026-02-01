import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {Box, FormControl, FormLabel, Input} from "@mui/joy";

interface EmployeeAddressSectionProps {
    isEditing: boolean,
    value: Pick<EmployeeFormData, "streetName" | "houseNumber" | "postcode" | "city">,
    onChange: (field: "streetName" | "houseNumber" | "postcode" | "city", value: string) => void;
}

export function EmployeeAdressSection({isEditing, value, onChange}: EmployeeAddressSectionProps) {
    return (
        <>
            <h5 style={{marginTop: 10}}>Adresse</h5>
            <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2}}>
                <FormControl>
                    <FormLabel>Straße</FormLabel>
                    <Input
                        value={value.streetName}
                        onChange={(event) => onChange("streetName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Hausnummer</FormLabel>
                    <Input
                        value={value.houseNumber}
                        onChange={(event) => onChange("houseNumber", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Postleitzahl</FormLabel>
                    <Input
                        value={value.postcode}
                        onChange={(event) => onChange("postcode", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Stadt</FormLabel>
                    <Input
                        value={value.city}
                        onChange={(event) => onChange("city", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
            </Box>
        </>
    )
}