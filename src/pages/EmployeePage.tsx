import EmployeeTable from "../components/EmployeeTable.tsx";
import {SearchFilterPanel} from "../components/SearchFilterPanel/SearchFilterPanel.tsx";
import {useFetchEmployees} from "../hooks/useFetchEmployees.ts";
import {useState} from "react";
import type {Employee} from "../types/employee.ts";

export function EmployeePage() {
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
    const {employees, loading, error } = useFetchEmployees();

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