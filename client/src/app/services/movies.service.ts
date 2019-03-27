import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {
    
    serverUrl: string = "http://localhost:4600/";
    searchEvent = new EventEmitter<string>();

    constructor(private http: HttpClient){};

    // //get all movies
    // public getMovies():Observable<Movie[]>{
    //     return this.http.get<Movie[]>(this.serverUrl);
    // }

    //get all movies by page
    public getMoviesByPage(pageNum:number, pageLimit:number):Observable<Movie[]>{
        return this.http.get<Movie[]>(this.serverUrl+"movies?pagenumber="+pageNum+"&pagelimit="+pageLimit);
    }

    // get movie by id 
    public getMovieById( id:string ): Observable<Movie>{
        return this.http.get<Movie>(this.serverUrl+id);
    }

    // get movie by filter values
    public searchMovies(filterVal : any): Observable<Movie[]>{
        return this.http.get<Movie[]>(this.serverUrl+"search?year="+filterVal.year
                                                    +"&genres="+filterVal.genres
                                                    +"&area="+filterVal.area);
    }

    // get movie by search string
    public searchMoviesByString(searchString : any): Observable<Movie[]>{
        return this.http.get<Movie[]>(this.serverUrl+"search/global?search="+searchString);
    }
}