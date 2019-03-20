import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {
    
    private movies: Movie[];//= [
    //     new Movie("Harry Potter",
    //             "Love this movie...",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM",
    //             2008,
    //             "aaa",
    //             ["bbb","ccc"],
    //             "fantsy",
    //             "UK",
    //             120,
    //             10), 
    //     new Movie("Harry Potter1",
    //             "Love this movie too...",
    //             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCFC_uuZY7jIT7EecrWAvYYpsFIubVyznbtju4ve50o_AYenZ",
    //             2010,
    //             "aaa",
    //             ["bbb","ccc"],
    //             "fantsy",
    //             "UK",
    //             120,
    //             10)];

    serverUrl: string = "http://localhost:4600/";

    constructor(private http: HttpClient){};

    public getMovies():Observable<Movie[]>{
        return this.http.get<Movie[]>(this.serverUrl);
    }
}