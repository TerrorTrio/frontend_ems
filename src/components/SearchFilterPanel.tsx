import "react-bootstrap";
import {SearchInput} from "./SearchInput.tsx";
import type {Employee} from "../types/employee.ts";

interface SearchFilterPanelProps {
    employees: Employee[],
    setEmployees: (employees: Employee[]) => void
}

export function SearchFilterPanel({employees, setEmployees}: SearchFilterPanelProps) {
    return (
        <>
            <SearchInput employees={employees} setEmployees={setEmployees}/>
        </>
    )
}