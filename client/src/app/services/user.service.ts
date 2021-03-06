import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { getToken } from '@angular/router/src/utils/preactivation';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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

    //UserPhoto communication
    prevUserPhoto: string;
    private userPhoto = new BehaviorSubject("");
    currentUserPhoto = this.userPhoto.asObservable();

    constructor(private http: HttpClient,
                private router: Router,
                ){};

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
    //check if userename exist, using in signup page
    public checkUsername(user: User): Observable<string>{
        return this.http.post<string>( this.serverUrl+"user/register/username",
            user,
            {});
    }
    //check if email exist, using in signup page
    public checkEmail(user: User): Observable<string>{
        return this.http.post<string>( this.serverUrl+"user/register/email",
            user,
            {});
    }
    //upload new photo link to back end and get new link from back end
    //(for showing new photo on profile page), using in photo-popup window
    public uploadPhoto(data: any): Observable<any>{
        return this.http.post<any>( this.serverUrl+"user/profile/edit",
            data,
            {});
    }

    //change user photo in srevice, using in communacation between
    //photo-popup window and user-profile page
    public changeUserPhoto(photoLink: string) {
        this.userPhoto.next(photoLink);
    }

    //get user photo when uername is input , using in login page
    public getUserPhoto(username: any): Observable<any>{
        return this.http.post<any>( this.serverUrl+"user/login/userimage",
            username,
            {});
    }
}