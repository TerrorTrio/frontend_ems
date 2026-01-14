export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    city: string,
    skillSet: Skill[]
}

interface Skill{
    id: number,
    skill: string
}

export interface EmployeeSearchResults {
    results: Employee[];
}