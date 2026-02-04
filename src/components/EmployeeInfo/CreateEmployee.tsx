import type {Employee} from "../../types/employee.ts";
import {
    Card,
} from "@mui/joy";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {EmployeePersonalSection} from "./EmployeePersonalSection.tsx";
import {EmployeeContactSection} from "./EmployeeContactSection.tsx";
import {EmployeeAddressSection} from "./EmployeeAddressSection.tsx";
import {EmployeeSkillsSection} from "./EmployeeSkillsSection.tsx";
import {ToastSnackBar} from "./ToastSnackBar.tsx";
import {useSaveEmployee} from "../../hooks/Employee/useSaveEmployee.ts";
import {SaveEmployeeActionsBar} from "./SaveEmployeeActionBar.tsx";
import {useCancelDialog} from "../../hooks/Dialogs/useCancelDialog.tsx";
import {useFetchQualifications} from "../../hooks/Qualification/useFetchQualifications.ts";
import {useSkillSelection} from "../../hooks/useSkillSelection.ts";
import type {ToastState} from "../../types/toast.ts";
import {useToastFromErrors} from "../../hooks/useToastFromErrors.ts";
import { useEmployeeForm } from "../../hooks/useEmployeeForm.ts";

export function CreateEmployee() {
    const navigate = useNavigate();

    const initialFormData: EmployeeFormData = {
        firstName: "",
        lastName: "",
        phone: "",
        streetName: "",
        houseNumber: "",
        postcode: "",
        city: ""
    };
    const {formData, setField, isValid} = useEmployeeForm(initialFormData);

    const {saveEmployee, saving, saveError} = useSaveEmployee();
    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();
    const {selectedSkills, addSkill, removeSkill} = useSkillSelection([]);

    const [toast, setToast] = useState<ToastState>({
        open: false,
        message: "",
        color: "danger"
    });

    useToastFromErrors([saveError, fetchQualificationError], setToast);

    const {openCancelDialog, CancelDialog} = useCancelDialog(() => {
        navigate("/employees");
    });

    const hasFormChanged =
        JSON.stringify(formData) !== JSON.stringify(initialFormData) ||
        selectedSkills.length > 0;

    const handleSave = async () => {
        const employee: Employee = {
            id: 1,
            firstName: formData.firstName,
            lastName: formData.lastName,
            street: `${formData.streetName} ${formData.houseNumber}`,
            postcode: formData.postcode,
            city: formData.city,
            phone: formData.phone,
            skillSet: selectedSkills
        };

        const result = await saveEmployee(employee);
        if (result) {
            navigate("/employees");
        }
    }

    const handleCancel = () => {
        if (hasFormChanged) {
            openCancelDialog();
        } else {
            navigate("/employees");
        }
    }

    return (
        <Card sx={{marginTop: 3, gap: 0}}>
            <EmployeePersonalSection
                isEditing={true}
                value={{firstName: formData.firstName, lastName: formData.lastName}}
                onChange={setField}/>

            <EmployeeContactSection
                isEditing={true}
                value={{phone: formData.phone}}
                onChange={setField}/>

            <EmployeeAddressSection
                isEditing={true}
                value={{
                    streetName: formData.streetName,
                    houseNumber: formData.houseNumber,
                    postcode: formData.postcode,
                    city: formData.city
                }}
                onChange={setField}/>

            <EmployeeSkillsSection
                isEditing={true}
                skills={skills}
                selectedSkills={selectedSkills}
                loading={loadingQualifications}
                onAdd={addSkill}
                onRemove={removeSkill}/>

            <SaveEmployeeActionsBar
                onCancel={handleCancel}
                saving={saving}
                onSave={handleSave}
                isFormValid={isValid}
            />

            <CancelDialog/>

            <ToastSnackBar
                toast={toast}
                onClose={() => setToast((prevState) => ({...prevState, open: false}))}/>
        </Card>
    )
}