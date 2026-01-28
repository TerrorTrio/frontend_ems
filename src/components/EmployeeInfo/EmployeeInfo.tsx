import type {Employee} from "../../types/employee.ts";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Chip,
    createFilterOptions,
    FormControl,
    FormLabel,
    Input,
    Snackbar
} from "@mui/joy";
import {parseStreet} from "../../hooks/useStreetParser.ts";
import {type SyntheticEvent, useEffect, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import {useDeleteDialog} from "../../hooks/useDeleteDialog.tsx";
import {useDeleteEmployee} from "../../hooks/useDeleteEmployee.ts";
import {useNavigate} from "react-router-dom";
import type {Skill} from "../../types/skill.ts";
import {useUpdateEmployee} from "../../hooks/useUpdateEmployee.ts";
import {useFetchQualifications} from "../../hooks/useFetchQualifications.ts";

interface EmployeeInfoProps {
    employee: Employee
    onUpdate?: () => void;
}

export default function EmployeeInfo({employee, onUpdate}: EmployeeInfoProps) {
    const {streetName, houseNumber} = parseStreet(employee.street);
    const {deleteEmployee, deleting, deleteError} = useDeleteEmployee();
    const {updateEmployee, updating, updateError} = useUpdateEmployee();
    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>(employee.skillSet ?? []);
    const [formData, setFormData] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        phone: employee.phone,
        streetName,
        houseNumber,
        postcode: employee.postcode,
        city: employee.city
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

    const {openDialog, Dialog} = useDeleteDialog(async (id) => {
        await deleteEmployee(id);
        if (!deleteError) {
            navigate("/employees");
        }
    });

    const filterOptions = createFilterOptions<Skill>(
        {
            matchFrom: "start",
            stringify: (option: { skill: string }) => option.skill
        }
    )

    const handleAddSkill = (_event: SyntheticEvent, value: Skill | null) => {
        if (value && !selectedSkills.some(skill => skill.id === value.id)) {
            setSelectedSkills([...selectedSkills, value]);
        }
    };

    const handleRemoveSkills = (id: number) => {
        setSelectedSkills(selectedSkills.filter(skill => skill.id !== id));
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData(prevState => ({...prevState, [field]: value}));
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

    const handleCancel = () => {
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
    }

    const handleGoBack = () => {
        navigate("/employees")
    }

    return (
        <Card sx={{marginTop: 3}}>
            <h5>Persönliche Daten</h5>
            <Box sx={{display: "flex", gap: 2}}>
                <FormControl sx={{flex: 1}}>
                    <FormLabel>Vorname</FormLabel>
                    <Input
                        value={isEditing ? formData.firstName : employee.firstName}
                        onChange={(event) => handleInputChange("firstName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl sx={{flex: 1}}>
                    <FormLabel>Nachname</FormLabel>
                    <Input
                        value={isEditing ? formData.lastName : employee.lastName}
                        onChange={(event) => handleInputChange("lastName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
            </Box>

            <h5 style={{marginTop: 10}}>Kontaktdaten</h5>
            <FormControl>
                <FormLabel>Telefon</FormLabel>
                <Input
                    value={isEditing ? formData.phone : employee.phone}
                    onChange={(event) => handleInputChange("phone", event.target.value)}
                    readOnly={!isEditing}
                    sx={{fontSize: 14}}
                />
            </FormControl>

            <h5 style={{marginTop: 10}}>Adresse</h5>
            <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2}}>
                <FormControl>
                    <FormLabel>Straße</FormLabel>
                    <Input
                        value={isEditing ? formData.streetName : streetName}
                        onChange={(event) => handleInputChange("streetName", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Hausnummer</FormLabel>
                    <Input
                        value={isEditing ? formData.houseNumber : houseNumber}
                        onChange={(event) => handleInputChange("houseNumber", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Postleitzahl</FormLabel>
                    <Input
                        value={isEditing ? formData.postcode : employee.postcode}
                        onChange={(event) => handleInputChange("postcode", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Stadt</FormLabel>
                    <Input
                        value={isEditing ? formData.city : employee.city}
                        onChange={(event) => handleInputChange("city", event.target.value)}
                        readOnly={!isEditing}
                        sx={{fontSize: 14}}
                    />
                </FormControl>
            </Box>

            <h5 style={{marginTop: 10}}>Qualifikationen</h5>
            <FormControl>
                <Autocomplete<Skill>
                    key={selectedSkills.length}
                    placeholder="Wähle eine Qualfikation aus"
                    options={skills.filter(skill => !selectedSkills.some(selectedSkill => selectedSkill.id === skill.id))}
                    getOptionLabel={(option) => option.skill}
                    filterOptions={filterOptions}
                    onChange={handleAddSkill}
                    value={null}
                    readOnly={!isEditing}
                    loading={loadingQualifications}
                    disabled={loadingQualifications}
                    sx={{fontSize: 14}}
                />
            </FormControl>

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, marginTop: 1}}>
                {selectedSkills.map((skill) => (
                    <Chip
                        key={skill.id}
                        variant="soft"
                        endDecorator={isEditing ? <CloseIcon fontSize="small"/> : null}
                        sx={{fontSize: 14}}
                        onClick={isEditing ? () => handleRemoveSkills(skill.id) : undefined}>
                        {skill.skill}
                    </Chip>
                ))}
            </Box>

            <Box sx={{display: "flex", justifyContent: "space-between", marginTop: 3}}>
                <Button
                    color="danger"
                    onClick={() => openDialog(employee.id)}
                    loading={deleting}
                >
                    Löschen
                </Button>

                <Box sx={{display: "flex", gap: 2}}>
                    {isEditing ? (
                        <>
                            <Button color="neutral" variant="outlined" onClick={handleCancel}
                                    disabled={updating}>Abbrechen</Button>
                            <Button color="primary" onClick={handleSave} loading={updating}>Speichern</Button>
                        </>
                    ) : (
                        <>
                        <Button color="neutral" onClick={handleGoBack}>Zurück</Button>
                        <Button color="primary" onClick={() => setIsEditing(true)}>Bearbeiten</Button>
                        </>
                    )}
                </Box>
            </Box>
            <Dialog/>

            <Snackbar
                open={toast.open}
                autoHideDuration={4000}
                onClose={() => setToast(prev => ({...prev, open: false}))}
                color={toast.color}
                variant="soft"
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                {toast.message}
            </Snackbar>
        </Card>
    )
}