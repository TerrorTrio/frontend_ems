import type {SyntheticEvent} from "react";
import type {Skill} from "../../types/skill.ts";
import {Autocomplete, Box, Chip, createFilterOptions, FormControl} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";

interface EmployeeSkillsSectionProps {
    isEditing: boolean,
    skills: Skill[],
    selectedSkills: Skill[],
    loading: boolean,
    onAdd: (_event: SyntheticEvent, value: Skill  | null) => void,
    onRemove: (id: number) => void
};

const filterOptions = createFilterOptions<Skill>({
    matchFrom: "start",
    stringify: (option) => option.skill
})

export function EmployeeSkillsSection({isEditing, skills, selectedSkills, loading, onAdd, onRemove}: EmployeeSkillsSectionProps) {
    const options = skills.filter(
        (skill) => !selectedSkills.some((selectedSkill) => selectedSkill.id === skill.id)
    );

    return (
        <>
            <h5 style={{marginTop: 10}}>Qualifikationen</h5>
            <FormControl>
                <Autocomplete<Skill>
                    key={selectedSkills.length}
                    placeholder="Wähle eine Qualfikation aus"
                    options={options}
                    getOptionLabel={(option) => option.skill}
                    filterOptions={filterOptions}
                    onChange={onAdd}
                    value={null}
                    readOnly={!isEditing}
                    loading={loading}
                    disabled={loading}
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
                        onClick={isEditing ? () => onRemove(skill.id) : undefined}>
                        {skill.skill}
                    </Chip>
                ))}
            </Box>
        </>
    )
}