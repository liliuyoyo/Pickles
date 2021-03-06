import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Movie } from "../models/movie.model";

@Injectable()
export class MoviesService {
  searchConditions = {
    str: "",
    year: "*",
    genres: "*",
    area: "*"
  };

  serverUrl: string = "http://localhost:4600/";
  // searchEvent = new EventEmitter<string>();
  movieListEvent = new EventEmitter<Movie[]>();
  moiveRatingStars ={
    fullStars:0,
    halfStar:0,
    emptyStars:0
  };
  moiveRating:number;

  constructor(private http: HttpClient) {}

  /*******************************************************
   * Set the searching conditions from the components
   ********************************************************/
  public setConditions(conditions: any) {
    this.searchConditions.year = conditions.year;
    this.searchConditions.area = conditions.area;
    this.searchConditions.genres = conditions.genres;
  }
  public getConditions() {
    return this.searchConditions;
  }

  public setSearchStr(str : string){
    this.searchConditions.str = str;
  }

  /*******************************************************
   * General Searching Method
   ********************************************************/
  public searchingMovies(): Observable<Movie[]> {
    console.log(this.searchConditions);
    return this.http.get<Movie[]>(
      this.serverUrl + "search?str=" + this.searchConditions.str + "&year=" + this.searchConditions.year + "&genres=" + this.searchConditions.genres + "&area=" + this.searchConditions.area
    );
  }

  /*******************************************************
   * Get single movie by id
   ********************************************************/
  public getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.serverUrl + id);
  }

  /*******************************************************
   * Update single movie
   ********************************************************/
  public updateMoiveById(updateData: any): Observable<any> {
    return this.http.post<any>(this.serverUrl + "movie/update", updateData);
  }

  /*******************************************************
   * Delete the movie with specific ID
   ********************************************************/
  public deleteMoiveById(deleteData: any): Observable<any> {
    return this.http.post<any>(this.serverUrl + "movie/delete", deleteData);
  }

  /*******************************************************
   * Create new movie
   ********************************************************/
  public createMovie(addData: any): Observable<any> {
    return this.http.post<any>(this.serverUrl + "movie/add", addData);
  }

  /*******************************************************
    * Unused Functions

    //get all movies
    public getMovies():Observable<Movie[]>{
        return this.http.get<Movie[]>(this.serverUrl);
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
    */
}
