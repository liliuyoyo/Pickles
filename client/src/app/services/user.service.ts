import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

/*Interfaces */
export interface UserDetails {
    _id: string;
    email: string;
    name: string;
    image: string;
    isUser: boolean;
    expire: number;
}
  
export interface TokenResponse {
    token: string;
}

@Injectable()
export class UserService {
    serverUrl: string = "http://localhost:4600/";
    headers:HttpHeaders;
    token: string;

    constructor(private http: HttpClient,
                private router: Router){};

    public saveToken(token: string): void {
        localStorage.setItem('mean-token', token);
        this.token = token;
    }
    
    public getToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('mean-token');
        }
        return this.token;
    }

    //get decode payload
    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payload;

        if (token) {
            payload = token.split('.')[1];
            payload = window.atob(payload);
            return JSON.parse(payload);
        } else {
            return null;
        }
    }

    // check whether user is loggedIn
    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            return user.expire > Date.now() / 1000;
        } else {
            return false;
        }
    }

    //login user and get TokenResponse
    public getLoginedUser(user: User):Observable<TokenResponse>{
        return this.http.post<TokenResponse>(this.serverUrl+"user/profile", user);
    }
    
    public userLogout(): void {
        this.token = '';
        window.localStorage.removeItem('mean-token');
        this.router.navigateByUrl('/movies');
    }

    /***************************************
     *  SHI JIN RU functions
    *****************************************/
    //get all users
    public getAllUsers():Observable<User[]>{
        return this.http.get<User[]>(this.serverUrl+"user/register/");
    }

    // get user by username
    public getUserByUsername(searchString : any): Observable<User[]>{
        return this.http.get<User[]>(this.serverUrl+"user/register="+searchString);
    }
    
    // public sendToBackend(signupString : signupUser): Observable<signupUser>{
    //     return this.http.post<signupUser>( this.serverUrl+"user/register",
    //         signupString,
    //          {})
    // }
    public sendToBackend(signupString : User): Observable<User>{
        return this.http.post<User>( this.serverUrl+"user/register",
            signupString,
             {});
    }
}