import type {Employee} from "../../types/employee.ts";
import {
    Card,
} from "@mui/joy";
import {parseStreet} from "../../hooks/useStreetParser.ts";
import {type SyntheticEvent, useEffect, useState} from "react";
import {useDeleteDialog} from "../../hooks/Dialogs/useDeleteDialog.tsx";
import {useDeleteEmployee} from "../../hooks/Employee/useDeleteEmployee.ts";
import {useNavigate} from "react-router-dom";
import type {Skill} from "../../types/skill.ts";
import {useUpdateEmployee} from "../../hooks/Employee/useUpdateEmployee.ts";
import {useFetchQualifications} from "../../hooks/useFetchQualifications.ts";
import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {EmployeePersonalSection} from "./EmployeePersonalSection.tsx";
import {EmployeeContactSection} from "./EmployeeContactSection.tsx";
import {EmployeeSkillsSection} from "./EmployeeSkillsSection.tsx";
import {EmployeeActionsBar} from "./EmployeeActionsBar.tsx";
import {ToastSnackBar} from "./ToastSnackBar.tsx";
import {useCancelDialog} from "../../hooks/Dialogs/useCancelDialog.tsx";
import {EmployeeAddressSection} from "./EmployeeAddressSection.tsx";

interface EmployeeInfoProps {
    employee: Employee
    onUpdate?: () => void;
}

export default function EmployeeInfo({employee, onUpdate}: EmployeeInfoProps) {
    const navigate = useNavigate();
    const {streetName, houseNumber} = parseStreet(employee.street);

    const {deleteEmployee, deleting, deleteError} = useDeleteEmployee();
    const {updateEmployee, updating, updateError} = useUpdateEmployee();
    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();

    const [isEditing, setIsEditing] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>(employee.skillSet ?? []);

    const initialData = {
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        streetName,
        houseNumber,
        postcode: employee.postcode,
        city: employee.city
    };
    const [formData, setFormData] = useState<EmployeeFormData>({
        ...initialData
    })

    const [toast, setToast] = useState<{ open: boolean; message: string; color: "danger" | "success" }>({
        open: false,
        message: "",
        color: "danger"
    });

    useEffect(() => {
        if (updateError) {
            setToast({open: true, message: updateError, color: "danger"});
        }
    }, [updateError]);

    useEffect(() => {
        if (deleteError) {
            setToast({open: true, message: deleteError, color: "danger"});
        }
    }, [deleteError]);

    useEffect(() => {
        if (fetchQualificationError) {
            setToast({open: true, message: fetchQualificationError, color: "danger"});
        }
    }, [fetchQualificationError]);

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

    const handleInputChange = (field: string, value: string) => {
        setFormData(prevState => ({...prevState, [field]: value}));
    }

    const handleAddSkill = (_event: SyntheticEvent, value: Skill | null) => {
        if (value && !selectedSkills.some(skill => skill.id === value.id)) {
            setSelectedSkills([...selectedSkills, value]);
        }
    };

    const handleRemoveSkill = (id: number) => {
        setSelectedSkills(selectedSkills.filter(skill => skill.id !== id));
    }

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
        JSON.stringify(formData) !== JSON.stringify(initialData) ||
        haveSkillsChanged() ;

    const handleCancel = () => {
        if (hasFormChanged) {
            openCancelDialog();
        } else {
            setIsEditing(false);
        }
    }

    const isFormValid = (): boolean => {
        const firstNameValid = formData.firstName.trim() !== "";
        const lastNameValid = formData.lastName.trim() !== "";
        const phoneValid = formData.phone.trim() !== "" && /^[\d\s\-+()]{6,20}$/.test(formData.phone);
        const streetValid = formData.streetName.trim() !== "";
        const houseNumberValid = formData.houseNumber.trim() !== "";
        const postcodeValid = /^\d{5}$/.test(formData.postcode);
        const cityValid = formData.city.trim() !== "";

        return firstNameValid && lastNameValid && phoneValid && streetValid && houseNumberValid && postcodeValid && cityValid;
    };

    return (
        <Card sx={{marginTop: 3, gap: 0}}>
            <EmployeePersonalSection
                isEditing={isEditing}
                value={{firstName: formData.firstName, lastName: formData.lastName}}
                onChange={handleInputChange}/>

            <EmployeeContactSection
                isEditing={isEditing}
                value={{phone: formData.phone}}
                onChange={handleInputChange}/>

            <EmployeeAddressSection
                isEditing={isEditing}
                value={{
                    streetName: formData.streetName,
                    houseNumber: formData.houseNumber,
                    postcode: formData.postcode,
                    city: formData.city
                }}
                onChange={handleInputChange}/>

            <EmployeeSkillsSection
                isEditing={isEditing}
                skills={skills}
                selectedSkills={selectedSkills}
                loading={loadingQualifications}
                onAdd={handleAddSkill}
                onRemove={handleRemoveSkill}/>

            <EmployeeActionsBar
                isEditing={isEditing}
                deleting={deleting}
                updating={updating}
                onDelete={() => openDeleteDialog(employee.id)}
                onGoBack={() => navigate("/employees")}
                onEdit={() => setIsEditing(true)}
                onCancel={handleCancel}
                onSave={handleSave}
                isFormValid={isFormValid()}/>

            <DeleteDialog/>
            <CancelDialog/>

            <ToastSnackBar
                toast={toast}
                onClose={() => setToast((prevState) => ({...prevState, open: false}))}/>
        </Card>
    )
}