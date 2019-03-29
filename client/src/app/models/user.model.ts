export class User {
    public _id: string;
    public username: string;
    public email?: string;
    public password?: string;
    public image?: string;
    public isUser: boolean;

    constructor(id: string, username:string, email:string, password:string, image:string, isUser:boolean){

        this._id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.image = image;
        this.isUser = isUser;
        
    }
}
