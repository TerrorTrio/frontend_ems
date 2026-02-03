import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {Box, FormControl, FormHelperText, FormLabel, Input} from "@mui/joy";

interface EmployeeAddressSectionProps {
    isEditing: boolean,
    value: Pick<EmployeeFormData, "streetName" | "houseNumber" | "postcode" | "city">,
    onChange: (field: "streetName" | "houseNumber" | "postcode" | "city", value: string) => void;
}

const isValidPostcode = (postcode: string): boolean => {
    return /^\d{5}$/.test(postcode);
}

export function EmployeeAddressSection({isEditing, value, onChange}: EmployeeAddressSectionProps) {
    const streetNameEmpty = value.streetName.trim() === "";
    const houseNumberEmpty = value.houseNumber.trim() === "";
    const postcodeEmpty = value.postcode.trim() === "";
    const postcodeInvalid = !postcodeEmpty && !isValidPostcode(value.postcode);
    const cityEmpty = value.city.trim() === "";
    return (
        <>
            <h5 style={{marginTop: 10}}>Adresse</h5>
            <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2}}>
                <FormControl error={isEditing && streetNameEmpty}>
                    <FormLabel>Straße</FormLabel>
                    <Input
                        value={value.streetName}
                        onChange={(event) => onChange("streetName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                    {isEditing && streetNameEmpty && (
                        <FormHelperText>Straße ist erforderlich</FormHelperText>
                    )}
                </FormControl>
                <FormControl error={isEditing && houseNumberEmpty}>
                    <FormLabel>Hausnummer</FormLabel>
                    <Input
                        value={value.houseNumber}
                        onChange={(event) => onChange("houseNumber", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                    {isEditing && houseNumberEmpty && (
                        <FormHelperText>Hausnummer ist erforderlich</FormHelperText>
                    )}
                </FormControl>
                <FormControl error={isEditing && (postcodeEmpty || postcodeInvalid)}>
                    <FormLabel>Postleitzahl</FormLabel>
                    <Input
                        value={value.postcode}
                        onChange={(event) => onChange("postcode", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                    {isEditing && postcodeEmpty && (
                        <FormHelperText>Postleitzahl ist erforderlich</FormHelperText>
                    )}
                    {isEditing && postcodeInvalid && (
                        <FormHelperText>Postleitzahl muss genau 5 Ziffern haben</FormHelperText>
                    )}
                </FormControl>
                <FormControl error={isEditing && cityEmpty}>
                    <FormLabel>Stadt</FormLabel>
                    <Input
                        value={value.city}
                        onChange={(event) => onChange("city", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                    {isEditing && cityEmpty && (
                        <FormHelperText>Stadt ist erforderlich</FormHelperText>
                    )}
                </FormControl>
            </Box>
        </>
    )
}