import type {Employee} from "../types/employee.ts";

export default function useEmployeeFilter(debouncedSearchTerm: string, employees: Employee[], searchedCity: string, selectedQualifications: string[]): Employee[] {
    if (!debouncedSearchTerm && debouncedSearchTerm.length === 0 && searchedCity === "" && selectedQualifications.length === 0) {
        return employees;
    }
    const searchTermLowerCase = debouncedSearchTerm.toLowerCase();

    function isCityMatch(e: Employee) {
        return searchedCity === "" || e.city.toLowerCase().includes(searchedCity.toLowerCase());
    }

    function isQualifiedEmployee(e: Employee) {
        return selectedQualifications.length === 0 || selectedQualifications.every(qual =>
            e.skillSet.some(skill => skill.skill.toLowerCase() === qual.toLowerCase()));
    }

    function containsSearchTermInNames(e: Employee) {
        return (e.firstName.toLowerCase().includes(searchTermLowerCase) ||
                e.lastName.toLowerCase().includes(searchTermLowerCase)) ||
            (`${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTermLowerCase)) ||
            (`${e.lastName} ${e.firstName}`.toLowerCase().includes(searchTermLowerCase));
    }

    return employees.filter(
        (e) =>
            containsSearchTermInNames(e) &&
            isCityMatch(e) &&
            isQualifiedEmployee(e)
    );
}
