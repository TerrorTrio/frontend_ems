import type {Employee} from "../../types/employee.ts";
import {
    Card,
} from "@mui/joy";
import {type SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {Skill} from "../../types/skill.ts";
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

export function CreateEmployee() {
    const initialFormData: EmployeeFormData = {
        firstName: "",
        lastName: "",
        phone: "",
        streetName: "",
        houseNumber: "",
        postcode: "",
        city: ""
    };

    const navigate = useNavigate();
    const {saveEmployee, saving, saveError} = useSaveEmployee();

    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

    const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);

    const [toast, setToast] = useState<{ open: boolean; message: string; color: "danger" | "success" }>({
        open: false,
        message: "",
        color: "danger"
    });

    const {openCancelDialog, CancelDialog} = useCancelDialog(() => {
        navigate("/employees");
    });

    useEffect(() => {
        if (saveError) {
            setToast({open: true, message: saveError, color: "danger"});
        }
    }, [saveError]);

    useEffect(() => {
        if (fetchQualificationError) {
            setToast({open: true, message: fetchQualificationError, color: "danger"});
        }
    }, [fetchQualificationError]);


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
                onChange={handleInputChange}/>

            <EmployeeContactSection
                isEditing={true}
                value={{phone: formData.phone}}
                onChange={handleInputChange}/>

            <EmployeeAddressSection
                isEditing={true}
                value={{
                    streetName: formData.streetName,
                    houseNumber: formData.houseNumber,
                    postcode: formData.postcode,
                    city: formData.city
                }}
                onChange={handleInputChange}/>

            <EmployeeSkillsSection
                isEditing={true}
                skills={skills}
                selectedSkills={selectedSkills}
                loading={loadingQualifications}
                onAdd={handleAddSkill}
                onRemove={handleRemoveSkill}/>

            <SaveEmployeeActionsBar
                onCancel={handleCancel}
                saving={saving}
                onSave={handleSave}/>

            <CancelDialog/>

            <ToastSnackBar
                toast={toast}
                onClose={() => setToast((prevState) => ({...prevState, open: false}))}/>
        </Card>
    )
}