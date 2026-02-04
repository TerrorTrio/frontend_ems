import type {Employee} from "../../types/employee.ts";
import {
    Card, Stack,
} from "@mui/joy";
import {parseStreet} from "../../hooks/useStreetParser.ts";
import {useState} from "react";
import {useDeleteDialog} from "../../hooks/Dialogs/useDeleteDialog.tsx";
import {useDeleteEmployee} from "../../hooks/Employee/useDeleteEmployee.ts";
import {useNavigate} from "react-router-dom";
import {useUpdateEmployee} from "../../hooks/Employee/useUpdateEmployee.ts";
import {EmployeePersonalSection} from "./EmployeePersonalSection.tsx";
import {EmployeeContactSection} from "./EmployeeContactSection.tsx";
import {EmployeeSkillsSection} from "./EmployeeSkillsSection.tsx";
import {EmployeeActionsBar} from "./EmployeeActionsBar.tsx";
import {ToastSnackBar} from "./ToastSnackBar.tsx";
import {useCancelDialog} from "../../hooks/Dialogs/useCancelDialog.tsx";
import {EmployeeAddressSection} from "./EmployeeAddressSection.tsx";
import {useFetchQualifications} from "../../hooks/Qualification/useFetchQualifications.ts";
import {useSkillSelection} from "../../hooks/useSkillSelection.ts";
import type {ToastState} from "../../types/toast.ts";
import {useToastFromErrors} from "../../hooks/useToastFromErrors.ts";
import {useEmployeeForm} from "../../hooks/useEmployeeForm.ts";

interface EmployeeInfoProps {
    employee: Employee
    onUpdate?: () => void;
}

export default function EmployeeInfo({employee, onUpdate}: EmployeeInfoProps) {
    const navigate = useNavigate();
    const {streetName, houseNumber} = parseStreet(employee.street);
    const initialFormData = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        streetName,
        houseNumber,
        postcode: employee.postcode,
        city: employee.city
    };
    const {formData, setFormData ,setField, isValid} = useEmployeeForm(initialFormData);

    const {deleteEmployee, deleting, deleteError} = useDeleteEmployee();
    const {updateEmployee, updating, updateError} = useUpdateEmployee();
    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();
    const {selectedSkills, setSelectedSkills, addSkill, removeSkill} =
        useSkillSelection(employee.skillSet ?? []);

    const [isEditing, setIsEditing] = useState(false);

    const [toast, setToast] = useState<ToastState>({
        open: false,
        message: "",
        color: "danger"
    });

    useToastFromErrors([updateError, deleteError, fetchQualificationError], setToast);

    const {openCancelDialog, CancelDialog} = useCancelDialog(() => {
        setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            phone: employee.phone,
            streetName,
            houseNumber,
            postcode: employee.postcode,
            city: employee.city
        });
        setSelectedSkills(employee.skillSet ?? []);
        setIsEditing(false);
    });

    const {openDeleteDialog, DeleteDialog} = useDeleteDialog(async (id) => {
        try {
            await deleteEmployee(id);
            navigate("/employees");
        } catch {
            // Fehler wird über deleteError-State im Hook behandelt
        }
    });

    const handleSave = async () => {
        const updatedEmployee: Employee = {
            ...employee,
            firstName: formData.firstName,
            lastName: formData.lastName,
            street: `${formData.streetName} ${formData.houseNumber}`,
            postcode: formData.postcode,
            city: formData.city,
            phone: formData.phone,
            skillSet: selectedSkills
        };

        const result = await updateEmployee(updatedEmployee);
        if (result) {
            setIsEditing(false);
            onUpdate?.();
        }
    }

    const haveSkillsChanged = () => {
        const originalIds = (employee.skillSet ?? []).map(skill => skill.id).sort();
        const selectedIds = selectedSkills.map(skill => skill.id).sort();
        if (originalIds.length !== selectedIds.length) return true;
        return !originalIds.every((id, index) => id === selectedIds[index]);
    };

    const hasFormChanged =
        JSON.stringify(formData) !== JSON.stringify(initialFormData) ||
        haveSkillsChanged() ;

    const handleCancel = () => {
        if (hasFormChanged) {
            openCancelDialog();
        } else {
            setIsEditing(false);
        }
    }

    return (
        <Card sx={{marginTop: 3, padding: {xs: 2, md: 3}}}>
            <Stack direction={'column'} spacing={3}>
            <EmployeePersonalSection
                isEditing={isEditing}
                value={{firstName: formData.firstName, lastName: formData.lastName}}
                onChange={setField}/>

            <EmployeeContactSection
                isEditing={isEditing}
                value={{phone: formData.phone}}
                onChange={setField}/>

            <EmployeeAddressSection
                isEditing={isEditing}
                value={{
                    streetName: formData.streetName,
                    houseNumber: formData.houseNumber,
                    postcode: formData.postcode,
                    city: formData.city
                }}
                onChange={setField}/>

            <EmployeeSkillsSection
                isEditing={isEditing}
                skills={skills}
                selectedSkills={selectedSkills}
                loading={loadingQualifications}
                onAdd={addSkill}
                onRemove={removeSkill}/>
        </Stack>

            <EmployeeActionsBar
                isEditing={isEditing}
                deleting={deleting}
                updating={updating}
                onDelete={() => openDeleteDialog(employee.id)}
                onGoBack={() => navigate("/employees")}
                onEdit={() => setIsEditing(true)}
                onCancel={handleCancel}
                onSave={handleSave}
                isFormValid={isValid}/>

            <DeleteDialog/>
            <CancelDialog/>

            <ToastSnackBar
                toast={toast}
                onClose={() => setToast((prevState) => ({...prevState, open: false}))}/>
        </Card>
    )
}