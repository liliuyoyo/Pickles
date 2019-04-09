import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { getToken } from '@angular/router/src/utils/preactivation';

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
    username: string;
    loggedin:boolean = false;

    constructor(private http: HttpClient,
                private router: Router){};

    public saveToken(token: string): void {
        sessionStorage.setItem('mean-token', token);        
        this.token = token;
    }
    
    public getToken(): string {
        if (!this.token) {
            this.token = sessionStorage.getItem('mean-token');
        }
        return this.token;
    }

    public saveUsername(username: string): void {
        sessionStorage.setItem('mean-username', username); 
        this.username = username;       
    }
    
    public getUsername(): string {
        if (!this.username) {
            this.username = sessionStorage.getItem('mean-username');
        }
        return this.username;
    }

    // check whether user is loggedIn
    public isLoggedIn(): Observable<string>{
        return this.http.post<string>(this.serverUrl+"status", { token: this.getToken()});
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
        this.username = '';
        window.sessionStorage.removeItem('mean-token');   
        window.sessionStorage.removeItem('mean-username');     
        window.open('/movies',"_self");
        //this.router.navigate(['/movies']);
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
    public signup(user: User): Observable<string>{
        return this.http.post<string>( this.serverUrl+"user/register",
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

    public uploadPhoto(data: any): Observable<string>{
        return this.http.post<string>( this.serverUrl+"user/profile/edit",
            data,
            {});
    }

}