import "react-bootstrap";
import {SearchInput} from "./SearchInput.tsx";
import type {Employee} from "../../types/employee.ts";
import {Filter} from "./Filter.tsx";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import useEmployeeFilter from "../../hooks/useEmployeeFilter.ts";

interface SearchFilterPanelProps {
    employees: Employee[],
    setFilteredEmployees: (filteredEmployees: Employee[]) => void
}

export function SearchFilterPanel({employees, setFilteredEmployees}: SearchFilterPanelProps) {
    const [searchedName, setSearchedName] = useState("");
    const [searchedCity, setSearchedCity] = useState("");
    const [debouncedSearchName] = useDebounce(searchedName, 500);
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);

    const results = useEmployeeFilter(debouncedSearchName, employees, searchedCity, selectedQualifications);
    useEffect(() => {
        setFilteredEmployees(results);
    }, [results, setFilteredEmployees]);

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "36px",
            }}>
                <SearchInput searchedName={searchedName} setSearchedName={setSearchedName}/>
                <Filter setSelectedQualifications={setSelectedQualifications} setSearchedCity={setSearchedCity}/>
            </div>
        </>
    )
}