import EmployeeTable from "../components/EmployeeTable.tsx";
import {SearchFilterPanel} from "../components/SearchFilterPanel.tsx";
import {useFetchEmployees} from "../hooks/useFetchEmployees.ts";
import {useState} from "react";
import type {Employee} from "../types/employee.ts";

export function EmployeePage() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
    const {loading, error} = useFetchEmployees(setEmployees);

    if (loading) {
        return <div>Lade Mitarbeiter...</div>;
    }
    if (error) {
        return <div> {error}</div>;
    }

    return (
        <>
            <SearchFilterPanel employees={employees} setFilteredEmployees={setFilteredEmployees}/>
            <EmployeeTable employees={filteredEmployees}/>
        </>
    )
}