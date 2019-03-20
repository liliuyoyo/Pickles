import { Component, OnInit } from '@angular/core';
import { Observable } from  "rxjs/Observable";
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  moviesList: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies()
    .subscribe(data => {
      this.moviesList = data;
    });;
  }

}
