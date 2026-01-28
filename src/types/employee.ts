export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    city: string,
    skillSet: Skill[]
}

export interface Skill{
    id: number,
    skill: string
}
