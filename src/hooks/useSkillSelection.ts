import {useCallback, useState, type SyntheticEvent} from "react";
import type {Skill} from "../types/skill.ts";

export function useSkillSelection(initial: Skill[] = []) {
    const [selectedSkills, setSelectedSkills] = useState<Skill[]>(initial);

    const addSkill = useCallback((_event: SyntheticEvent, value: Skill | null) => {
        if (!value) return;
        setSelectedSkills((prev) => (prev.some((s) => s.id === value.id) ? prev : [...prev, value]));
    }, []);

    const removeSkill = useCallback((id: number) => {
        setSelectedSkills((prev) => prev.filter((s) => s.id !== id));
    }, []);

    return {selectedSkills, setSelectedSkills, addSkill, removeSkill};
}