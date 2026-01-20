import type {Employee} from "../types/employee.ts";

export default function useEmployeeSearch(debouncedSearchTerm: string, employees: Employee[]): Employee[] {
    if (!debouncedSearchTerm || debouncedSearchTerm.length === 0) {
        return employees;
    }

    const searchTermLowerCase = debouncedSearchTerm.toLowerCase();

    return employees.filter(
        (e) =>
            e.firstName.toLowerCase().includes(searchTermLowerCase) ||
            e.lastName.toLowerCase().includes(searchTermLowerCase)
    );
}
