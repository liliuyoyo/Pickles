import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  
  moviesList: Movie[];
  
  token:string ="";
  isAdmin:boolean = false;
  items = 8;

  constructor(private moviesService: MoviesService,
              private userService:UserService) {}


  ngOnInit() {
    /* Initially get all movies */
    this.moviesService.searchingMovies()
    .subscribe((data)=>{
      this.moviesList = data;
    }).unsubscribe;

    // /* Top searching bar event linster */
    // this.subscription1 = this.moviesService.searchEvent
    // .subscribe( str => {
    //   this.searchConditions.str = str;
    //   this.moviesService.searchingMovies(this.searchConditions)
    //   .subscribe(data => this.moviesList = data);
    // });
    /* Top searching bar event linster */
    this.moviesService.movieListEvent
    .subscribe((data)=>{
      this.moviesList = data;
    });
  

    /*check whether the user is admin */
    this.token = this.userService.getToken();
    if(this.token != null){
      this.userService.getLoginedUser(this.token)
      .subscribe((res)=>{
        if(res['status']=='true'){
          this.isAdmin = !res['isuser'];
          if(this.isAdmin){
            this.items = 7;
          }
       }else{
           console.log("error");
       }
      });
    }
  }

  /* Filter linster */
  filterMovies(filterVal : any){
    this.moviesService.setConditions(filterVal);
    this.moviesService.searchingMovies()
    .subscribe(data => {
      this.moviesList = data;
    });
  }

  
}
