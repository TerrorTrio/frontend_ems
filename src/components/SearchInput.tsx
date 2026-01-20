import {Input} from "@mui/joy";
import "./css/SearchInput.css";
import {SearchRounded} from "@mui/icons-material";
import useEmployeeSearch from "../hooks/useEmployeeSearch.ts";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import type {Employee} from "../types/employee.ts";

interface SearchInputProps {
    employees: Employee[],
    setFilteredEmployees: (filteredEmployees: Employee[]) => void
}

export function SearchInput({ employees, setFilteredEmployees }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

    const results = useEmployeeSearch(debouncedSearchTerm, employees);
    console.log(results);
    useEffect(() => {
        setFilteredEmployees(results);
    }, [results, setFilteredEmployees]);

    return <Input className={"input"}
                  placeholder={"Suchen..."}
                  startDecorator={<SearchRounded sx={{ml: "-3px"}}/>}
                  sx={{
                      width: "70%",
                      "--Input-radius": "15px",
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
    />;
}