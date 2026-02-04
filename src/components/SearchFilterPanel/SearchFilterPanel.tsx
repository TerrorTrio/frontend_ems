import "react-bootstrap";
import {SearchInput} from "./SearchInput.tsx";
import {Filter} from "./Filter.tsx";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import useEmployeeFilter from "../../hooks/Employee/useEmployeeFilter.ts";
import {useEmployees} from "../../context/EmployeeContext.tsx";

export function SearchFilterPanel() {
    const [searchedName, setSearchedName] = useState("");
    const [searchedCity, setSearchedCity] = useState("");
    const [debouncedSearchName] = useDebounce(searchedName, 500);
    const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);

    const {employees, setFilteredEmployees} = useEmployees();

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