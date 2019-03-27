import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import { User,signupUser } from 'src/app/models/user.model';

@Injectable()
export class UserService {
    serverUrl: string = "http://localhost:4600/";
    headers:HttpHeaders;

    constructor(private http: HttpClient){};
    
    //get logined user
    public getLoginedUser(username:string, password:string):Observable<User>{
        return this.http.get<User>(this.serverUrl+"user/profile?username="+username
                                                                +"&password="+password);
    }

    //get all users
    public getAllUsers():Observable<User[]>{
        return this.http.get<User[]>(this.serverUrl+"user/register/");
    }

    // get user by username
    public getUserByUsername(searchString : any): Observable<User[]>{
        return this.http.get<User[]>(this.serverUrl+"user/register="+searchString);
    }
    
    public sendToBackend(signupString : signupUser): Observable<User>{
        return this.http.post<User>(
            this.serverUrl+"user/register",{}, {})
    }
}