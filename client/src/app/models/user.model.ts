export class User {
    public _id: string;
    public username: string;
    public email?: string;
    public password?: string;
    public image?: string;
    public isUser: boolean;
}

export class signupUser{
    public username: string;
    public email?: string;
    public password?: string;
}