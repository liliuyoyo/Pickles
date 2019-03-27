import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  
  private subscription : Subscription;
  moviesList: Movie[];
  searchConditions = {
    str:"",
    year:"*",
    genres:"*",
    area:"*"
  };

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    // this.moviesService.getMovies()
    // .subscribe( data => {
    //   this.moviesList = data;
    // });

    /* Initially get all movies */
    this.subscription = this.moviesService.searchingMovies(this.searchConditions)
    .subscribe((data)=>{
      this.moviesList = data;
    });

    /* Top searching bar event linster */
    this.subscription = this.moviesService.searchEvent
    .subscribe( str => {
      this.searchConditions.str = str;
      this.moviesService.searchingMovies(this.searchConditions)
      .subscribe(data => this.moviesList = data);
    });
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
  }
}
