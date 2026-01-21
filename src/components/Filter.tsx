import {FaFilter} from "react-icons/fa";
import "./css/SearchFilterPanel.css"
import {useState} from "react";
import {Button, Card, Input} from "@mui/joy";
import {MultiSelectQualification} from "./MultiSelectQualification.tsx";

interface Props {
    selectedQualifications: string[];
    setSelectedQualifications: (selected: string[]) => void;
    setSearchedCity: (selected: string) => void;
}

export function Filter({selectedQualifications, setSelectedQualifications, setSearchedCity: setSearchedCity}: Props) {
    const [showFilter, setShowFilter] = useState(false);
    let selectedCity: string = "";

    return (
        <div className={"filter-wrapper"}>
            <button
                className="filter-button"
                onClick={() => setShowFilter(prev => !prev)}
            >
                <FaFilter/> Filter
            </button>
            {showFilter && (
                <Card className="filter-widget">
                    <Input placeholder={"Ort..."} onChange={(e) => { selectedCity = e.target.value }}/>
                    <MultiSelectQualification selectedQualifications={selectedQualifications}
                                              setSelectedQualifications={setSelectedQualifications}/>
                    <Button onClick={() => setSearchedCity(selectedCity)}>
                        Übernehmen
                    </Button>
                </Card>
            )}
        </div>
    );
}