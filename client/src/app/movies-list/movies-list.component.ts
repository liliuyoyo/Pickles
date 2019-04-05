import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  
  private subscription : Subscription;
  private subscription1 : Subscription;
  private subscription2 : Subscription;
  moviesList: Movie[];
  searchConditions = {
    str:"",
    year:"*",
    genres:"*",
    area:"*"
  };
  token:string ="";
  isAdmin:boolean = false;

  constructor(private moviesService: MoviesService,
              private userService:UserService) {}

  ngOnInit() {
    /* Initially get all movies */
    this.subscription = this.moviesService.searchingMovies(this.searchConditions)
    .subscribe((data)=>{
      this.moviesList = data;
    });

    /* Top searching bar event linster */
    this.subscription1 = this.moviesService.searchEvent
    .subscribe( str => {
      this.searchConditions.str = str;
      this.moviesService.searchingMovies(this.searchConditions)
      .subscribe(data => this.moviesList = data);
    });

    /*check whether the user is admin */
    this.token = this.userService.getToken();
    if(this.token != null){
      this.subscription2 = this.userService.getLoginedUser(this.token)
      .subscribe((res)=>{
        if(res['status']=='true'){
          this.isAdmin = !res['isuser'];
       }else{
           console.log("error");
       }
      });
    }
  }

  /* Filter linster */
  filterMovies(filterVal : any){
    this.moviesService.searchingMovies(filterVal)
    .subscribe(data => {
      this.moviesList = data;
    });;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
}
