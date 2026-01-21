export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    street : string,
    postcode: string,
    city: string,
    phone: string,
    skillSet: Skill[]
}

interface Skill{
    id: number,
    skill: string
}
