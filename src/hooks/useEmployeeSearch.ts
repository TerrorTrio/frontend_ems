import type {Employee} from "../types/employee.ts";

export default function useEmployeeSearch(debouncedSearchTerm: string, employees: Employee[]): Employee[] {
    if (!debouncedSearchTerm || debouncedSearchTerm.length === 0) {
        return employees;
    }

    const lower = debouncedSearchTerm.toLowerCase();

    const searchedEmployees = employees.filter(
        (e) =>
            e.firstName.toLowerCase().includes(lower) ||
            e.lastName.toLowerCase().includes(lower)
    );

    return searchedEmployees;
}
