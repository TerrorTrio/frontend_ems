import "react-bootstrap";
import {SearchInput} from "./SearchInput.tsx";
import type {Employee} from "../types/employee.ts";
import {Row} from "react-bootstrap";

interface SearchFilterPanelProps {
    employees: Employee[],
    setFilteredEmployees: (filteredEmployees: Employee[]) => void
}

export function SearchFilterPanel({employees, setFilteredEmployees}: SearchFilterPanelProps) {
    return (
        <>
            <Row>
                <SearchInput employees={employees} setFilteredEmployees={setFilteredEmployees}/>
            </Row>
        </>
    )
}