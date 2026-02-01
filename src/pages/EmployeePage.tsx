import EmployeeTable from "../components/EmployeeTable.tsx";
import {SearchFilterPanel} from "../components/SearchFilterPanel/SearchFilterPanel.tsx";
import {useFetchEmployees} from "../hooks/Employee/useFetchEmployees.ts";
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
            <h3 style={{
                marginBottom: "20px"
            }}>Mitarbeiterübersicht</h3>
            <SearchFilterPanel employees={employees} setFilteredEmployees={setFilteredEmployees}/>
            <EmployeeTable filteredEmployees={filteredEmployees}/>
        </>
    )
}