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

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.subscription = this.moviesService.getMovies()
    .subscribe(data => {
      this.moviesList = data;
    });
  }

  filterMovies(filterVal : any){
    this.moviesService.searchMovies(filterVal)
    .subscribe(data => {
      this.moviesList = data;
    });;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
