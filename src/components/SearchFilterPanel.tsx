import "react-bootstrap";
import {SearchInput} from "./SearchInput.tsx";
import type {Employee} from "../types/employee.ts";
import {Filter} from "./Filter.tsx";
import "./css/SearchFilterPanel.css";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import useEmployeeSearch from "../hooks/useEmployeeSearch.ts";

interface SearchFilterPanelProps {
    employees: Employee[],
    setFilteredEmployees: (filteredEmployees: Employee[]) => void
}

export function SearchFilterPanel({employees, setFilteredEmployees}: SearchFilterPanelProps) {
    const [searchedName, setSearchedName] = useState("");
    const [searchedCity, setSearchedCity] = useState("");
    const [debouncedSearchName] = useDebounce(searchedName, 500);
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);


    const results = useEmployeeSearch(debouncedSearchName, employees, searchedCity, selectedQualifications);
    console.log(results);
    useEffect(() => {
        setFilteredEmployees(results);
    }, [results, setFilteredEmployees]);

    return (
        <>
            <div className="search-filter-panel">
                <SearchInput searchedName={searchedName} setSearchedName={setSearchedName}/>
                <Filter selectedQualifications={selectedQualifications}
                        setSelectedQualifications={setSelectedQualifications} setSearchedCity={setSearchedCity}/>
            </div>
        </>
    )
}