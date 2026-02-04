import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {FormControl, FormHelperText, FormLabel, Input} from "@mui/joy";

interface EmployeeContactSectionProps {
    isEditing: boolean,
    value: Pick<EmployeeFormData, "phone">,
    onChange: (field: "phone", value: string) => void;
}

const isValidPhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-+()]{6,20}$/;
    return phoneRegex.test(phone);
}

export function EmployeeContactSection({isEditing, value, onChange}: EmployeeContactSectionProps) {
    const phoneEmpty = value.phone.trim() === "";

    return (
        <>
            <h5 style={{marginTop: 20}}>Kontaktdaten</h5>
            <FormControl error={isEditing && (phoneEmpty || !isValidPhoneNumber(value.phone))}>
                <FormLabel>Telefon</FormLabel>
                <Input
                    value={value.phone}
                    onChange={(event) => onChange("phone", event.target.value)}
                    readOnly={!isEditing}
                    sx={{fontSize: 14}}
                />
                {isEditing && phoneEmpty && (
                    <FormHelperText>Telefonnummer ist erforderlich</FormHelperText>
                )}
                {isEditing && !phoneEmpty && !isValidPhoneNumber(value.phone) &&(
                    <FormHelperText>Ungültige Telefonnummer</FormHelperText>
                )}
            </FormControl>
        </>
    )
}