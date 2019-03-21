import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {
    private searchString : string;
    serverUrl: string = "http://localhost:4600/";

    constructor(private http: HttpClient){};

    public setSearchString(str: string){
        this.searchString = str;
    }

    public getMovies():Observable<Movie[]>{
        return this.http.get<Movie[]>(this.serverUrl);
    }

    public getMovieById( id:string ): Observable<Movie>{
        return this.http.get<Movie>(this.serverUrl+id);
    }
}