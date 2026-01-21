import type {Employee} from "../types/employee.ts";

export default function useEmployeeSearch(debouncedSearchTerm: string, employees: Employee[], searchedCity: string, selectedQualifications: string[]): Employee[] {
    if (!debouncedSearchTerm && debouncedSearchTerm.length === 0 && searchedCity === "" && selectedQualifications.length === 0) {
        return employees;
    }

    const searchTermLowerCase = debouncedSearchTerm.toLowerCase();

    return employees.filter(
        (e) =>
            (e.firstName.toLowerCase().includes(searchTermLowerCase) ||
                e.lastName.toLowerCase().includes(searchTermLowerCase)) &&
            (searchedCity === "" || e.city.toLowerCase().includes(searchedCity.toLowerCase())) &&
            (selectedQualifications.length === 0 || selectedQualifications.every(qual =>
                e.skillSet.some(skill => skill.skill.toLowerCase() === qual.toLowerCase())))
    );
}
