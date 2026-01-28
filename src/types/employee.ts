import type {Skill} from "./skill.ts";

export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    city: string,
    skillSet: Skill[]
}


