import {type SyntheticEvent, useState} from "react";
import type {Skill} from "../../types/skill.ts";
import {Autocomplete, Box, Chip, createFilterOptions, FormControl} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import {createSkillModal} from "../Qualification/CreateSkillModal.tsx";
import {useFetchQualifications} from "../../hooks/Qualification/useFetchQualifications.ts";
import {useCreateQualification} from "../../hooks/Qualification/useCreateQualification.ts";

interface EmployeeSkillsSectionProps {
    isEditing: boolean,
    skills: Skill[],
    selectedSkills: Skill[],
    loading: boolean,
    onAdd: (_event: SyntheticEvent, value: Skill | null) => void,
    onRemove: (id: number) => void
}

const filterOptions = createFilterOptions<Skill>({
    matchFrom: "start",
    stringify: (option) => option.skill
})

export function EmployeeSkillsSection({
                                          isEditing,
                                          selectedSkills,
                                          loading,
                                          onAdd,
                                          onRemove
                                      }: EmployeeSkillsSectionProps) {
    const {skills, fetchQualifications} = useFetchQualifications();
    const [inputValue, setInputValue] = useState("");
    const options = skills.filter(
        (skill) => !selectedSkills.some((selectedSkill) => selectedSkill.id === skill.id)
    );
    const {createQualification, isCreating} = useCreateQualification();

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [newSkillValue, setNewSkillValue] = useState("");

    const handleAddSave = async () => {
        const result = await createQualification(newSkillValue.trim());
        if (result) {
            await fetchQualifications();
            onAdd(new Event("custom") as unknown as SyntheticEvent, result);
            setAddModalOpen(false);
            setNewSkillValue("");
        }
    };

    const handleAddCancel = () => {
        setAddModalOpen(false);
        setNewSkillValue("");
    };

    {
        createSkillModal(addModalOpen, handleAddCancel, newSkillValue, setNewSkillValue, handleAddSave, isCreating)
    }

    return (
        <>
            <h5 style={{marginTop: 20}}>Qualifikationen</h5>
            {createSkillModal(addModalOpen, handleAddCancel, newSkillValue, setNewSkillValue, handleAddSave, isCreating)}
            {isEditing && <FormControl>
                <Autocomplete<Skill>
                    key={selectedSkills.length}
                    placeholder="Wähle eine Qualifikation aus"
                    options={options}
                    getOptionLabel={(option) => option.skill}
                    filterOptions={filterOptions}
                    inputValue={inputValue}
                    onInputChange={(_, newValue) => setInputValue(newValue)}
                    onChange={onAdd}
                    value={null}
                    readOnly={!isEditing}
                    loading={loading}
                    disabled={loading}
                    sx={{fontSize: 14}}
                    noOptionsText={
                        <div style={{display: "flex", textAlign: "center", alignItems: "center", gap: "20px"}}>
                            <div>Keine Qualifikation gefunden</div>
                            <span
                                style={{
                                    color: "#1976d2",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    fontSize: 14,
                                }}
                                onClick={() => {
                                    setAddModalOpen(true)
                                    setNewSkillValue(inputValue)
                                }}
                            >
                            Qualifikation hinzufügen
                        </span>

                        </div>
                    }
                />
            </FormControl>}

            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1, margin: "8px"}}>
                {selectedSkills.map((skill) => (
                    <Chip
                        key={skill.id}
                        variant="soft"
                        endDecorator={isEditing ? <CloseIcon fontSize="small"/> : null}
                        sx={{fontSize: 14}}
                        onClick={isEditing ? () => onRemove(skill.id) : undefined}>
                        {skill.skill}
                    </Chip>
                ))}
            </Box>
        </>
    )
}