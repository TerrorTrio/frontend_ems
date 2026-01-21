import {useState} from "react";
import {Input} from "@mui/joy";

const OPTIONS = [
    "Frontend",
    "Backend",
    "Angular",
    "QA",
    'Java',
    "Management",
    'UX',
    "bölakmsdlf ndkjsewfdfffnc",
    'UI',
    "bäla",

];

interface Props {
    selectedQualifications: string[];
    setSelectedQualifications: (selected: string[]) => void;
}

export function MultiSelectQualification({ selectedQualifications, setSelectedQualifications }: Props) {
    const [search, setSearch] = useState("");

    function toggleOption(option: string) { ///
        const newSelected = selectedQualifications.includes(option)
            ? selectedQualifications.filter((o) => o !== option)
            : [...selectedQualifications, option];
        setSelectedQualifications(newSelected);
    }

    const filteredOptions = OPTIONS.filter((o) =>
        o.toLowerCase().includes(search.toLowerCase())
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

                <ul className="qualification-list msd-list">
                    {filteredOptions.length === 0 && (
                        <li className="msd-empty">Keine Treffer</li>
                    )}

                    {filteredOptions.map((option) => (
                        <li
                            key={option}
                            className="msd-item"
                            onClick={() => toggleOption(option)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedQualifications.includes(option)}
                                style={{marginRight: 8, accentColor: "#1d55c7"}}
                                readOnly
                            />
                            <span className="msd-item-label">{option}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
