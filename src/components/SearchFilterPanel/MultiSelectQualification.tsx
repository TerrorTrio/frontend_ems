import {useState} from "react";
import {Input} from "@mui/joy";
import {useFetchQualifications} from "../../hooks/useFetchQualifications.ts";
import type {Skill} from "../../types/skill.ts";

interface MultiSelectQualificationProps {
    tempQualifications: string[];
    setTempQualifications: (selected: string[]) => void;
}

export function MultiSelectQualification({tempQualifications, setTempQualifications}: MultiSelectQualificationProps) {
    const [search, setSearch] = useState("");
    const {skills, loadingQualifications, fetchQualificationError} = useFetchQualifications();

    function toggleOption(option: string) {
        const newSelected = tempQualifications.includes(option)
            ? tempQualifications.filter((o) => o !== option)
            : [...tempQualifications, option];
        setTempQualifications(newSelected);
    }

    const filteredOptions = skills.filter((o) =>
        o.skill.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="msd-root">
            <div className="msd-dropdown">
                <Input
                    type="text"
                    placeholder="Qualifikation..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="msd-search"
                />

                <ul className="msd-list"
                    style={{
                        listStyle: "none",
                        padding: 13,
                        maxHeight: 200,
                        overflowY: "auto",
                    }}>
                    {loadingQualifications && <li className="msd-loading">Lade Qualifikationen...</li>}
                    {fetchQualificationError && <li className="msd-error">Fehler beim Laden der Qualifikationen</li>}
                    {!loadingQualifications && !fetchQualificationError && filteredOptions.map((option: Skill) => (
                        <li
                            key={option.skill}
                            className="msd-item"
                            onClick={() => toggleOption(option.skill)}
                        >
                            <input
                                type="checkbox"
                                checked={tempQualifications.includes(option.skill)}
                                style={{marginRight: 8, accentColor: "#1d55c7"}}
                                readOnly
                            />
                            <span className="msd-item-label">{option.skill}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
