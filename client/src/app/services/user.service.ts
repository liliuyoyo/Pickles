import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import { User } from 'src/app/models/user.model';

@Injectable()
export class UserService {
    serverUrl: string = "http://localhost:4600/";
    headers:HttpHeaders;

    constructor(private http: HttpClient){};

    //get all users
    public getAllUsers():Observable<User[]>{
        return this.http.get<User[]>(this.serverUrl+"user/register/");
    }

    // get user by username
    public getUserByUsername(searchString : any): Observable<User[]>{
        return this.http.get<User[]>(this.serverUrl+"user/register="+searchString);
    }
    
    public sendToBackend(signupString : User): Observable<User>{
        // return this.http.get<User>(this.serverUrl
        //     +"user/register?username="+signupString.username
        //     +"&useremeail="+signupString.email
        //     +"&userpassword="+signupString.password);
    
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
        return this.http.post<User>(
            this.serverUrl+"user/register",
            JSON.stringify(signupString), 
            {headers: this.headers}
        );
    }
}