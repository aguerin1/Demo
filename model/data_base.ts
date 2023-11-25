export type User = {
    uId : number;
    email: string;
    password: string;
    name: string;
    isLibrarian: boolean;
}

export type Book = {
    bId : number;
    isbn : number;
    title: string;
    name: string;
    author: string;
    copies: number;
    copiesOut: number;
    copiesAvailable: number;
}

export type Checkout = {
    id : number;
    uId : number;
    isbn : number;
    date : string;
}
