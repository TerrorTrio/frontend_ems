import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {FormControl, FormLabel, Input} from "@mui/joy";

interface EmployeeContactSectionProps {
    isEditing: boolean,
    value: Pick<EmployeeFormData, "phone">,
    onChange: (field: "phone", value: string) => void;
}

export function EmployeeContactSection({isEditing, value, onChange}: EmployeeContactSectionProps) {
    return (
        <>
            <h5 style={{marginTop: 10}}>Kontaktdaten</h5>
            <FormControl>
                <FormLabel>Telefon</FormLabel>
                <Input
                    value={value.phone}
                    onChange={(event) => onChange("phone", event.target.value)}
                    readOnly={!isEditing}
                    sx={{fontSize: 14}}
                />
            </FormControl>
        </>
    )
}