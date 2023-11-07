export type User = {
    uId : number;
    email: string;
    password: string;
    name: string;
}

export type Book = {
    bId : number;
    isbn : number;
    title: string;
    name: string;
    author: string;
    copies: number;
    copiesOut: number;
}

export type Checkout = {
    id : number;
    uId : number;
    isbn : number;
    date : string;
}
