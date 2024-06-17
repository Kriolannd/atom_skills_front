import { SomeEnum } from "@/utilities/someEnum";


export interface IAuthorizeData {
    username: string;
    password: string;
}


export interface IRegisterData {
    username: string;
    email: string;
    password: string;
}

export interface ISomeData {
    text: string;
    number: number;
    date: Date;
    someEnum: SomeEnum;
    file: string;
}

export interface ISomeEntity {
    id: number,
    text: string,
    number: number,
    date: Date,
    someEnum: SomeEnum,
    file: string
}

export interface ICardData {
    title: string,
    traits: string[],
    description: string
}

export interface ITask {
    code: string
    title: string,
    content: string,
    description: string,
    supplement: [{
        title: string,
        file: string
    }],
    difficulty: number,
    time: number,
    lessons: [{
        code: string,
        title: string,
        traits: [{
            code: string,
            name: string,
            description: string
        }]
    }]
}