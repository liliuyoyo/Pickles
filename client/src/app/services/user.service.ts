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

@Injectable()
export class UserService {
    serverUrl: string = "http://localhost:4600/";
    headers:HttpHeaders;
    token: string;
    loggedin:boolean = false;

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

    // check whether user is loggedIn
    public isLoggedIn(): Observable<string>{
        return this.http.post<string>(this.serverUrl+"status", { token: this.token });
    }

    //login user and get TokenResponse
    public userLogin(user: User):Observable<any>{
        return this.http.post<any>(this.serverUrl+"user/login", user);
    }

    // get logined user profile
    public getLoginedUser(token: string):Observable<any>{
        return this.http.post<any>(this.serverUrl+"user/profile", { token: token });
    }
    
    public userLogout(): void {
        this.token = '';
        window.localStorage.removeItem('mean-token');
        this.router.navigateByUrl('/movies');
    }

    /***************************************
     *  SHI JIN RU functions
    *****************************************/
    // get user by username
    public getUserByUsername(searchString : any): Observable<User[]>{
        return this.http.get<User[]>(this.serverUrl+"user/register="+searchString);
    }
    
    //username or email already exists when return false
    //signup successfully when return true
    public signup(user: User): Observable<boolean>{
        return this.http.post<boolean>( this.serverUrl+"user/register",
            user,
            {});
    }
    public checkUsername(user: User): Observable<string>{
        return this.http.post<string>( this.serverUrl+"user/register/username",
            user,
            {});
    }
    public checkEmail(user: User): Observable<string>{
        return this.http.post<string>( this.serverUrl+"user/register/email",
            user,
            {});
    }
}