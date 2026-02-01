import type {Employee} from "../../types/employee.ts";
import {
    Card,
} from "@mui/joy";
import {type SyntheticEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import type {Skill} from "../../types/skill.ts";
import {useFetchQualifications} from "../../hooks/useFetchQualifications.ts";
import type {EmployeeFormData} from "../../types/employeeFormData.ts";
import {EmployeePersonalSection} from "./EmployeePersonalSection.tsx";
import {EmployeeContactSection} from "./EmployeeContactSection.tsx";
import {EmployeeAdressSection} from "./EmployeeAdressSection.tsx";
import {EmployeeSkillsSection} from "./EmployeeSkillsSection.tsx";
import {ToastSnackBar} from "./ToastSnackBar.tsx";
import {useSaveEmployee} from "../../hooks/Employee/useSaveEmployee.ts";
import {SaveEmployeeActionsBar} from "./SaveEmployeeActionBar.tsx";


export default function CreateEmployee() {
    const navigate = useNavigate();
    const {saveEmployee, saving, saveError} = useSaveEmployee();

    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

    const [formData, setFormData] = useState<EmployeeFormData>({
        firstName: "",
        lastName: "",
        phone: "",
        streetName: "",
        houseNumber: "",
        postcode: "",
        city: ""
    });

    const [toast, setToast] = useState<{ open: boolean; message: string; color: "danger" | "success" }>({
        open: false,
        message: "",
        color: "danger"
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
        navigate("/employees");
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

            <EmployeeAdressSection
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

            <ToastSnackBar
                toast={toast}
                onClose={() => setToast((prevState) => ({...prevState, open: false}))}/>
        </Card>
    )
}