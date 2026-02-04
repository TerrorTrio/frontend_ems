import type {Skill} from "./skill.ts";

export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    street: string,
    postcode: string,
    city: string,
    phone: string,
    skillSet: Skill[]
}