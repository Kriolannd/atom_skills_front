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