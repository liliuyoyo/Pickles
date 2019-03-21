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
  //moviesListCopy: Movie[];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.subscription = this.moviesService.getMovies()
    .subscribe(data => {
      this.moviesList = data;
      //this.moviesListCopy = data;
    });;
  }

  // filterMovies(filterVal : any){
  //   if(filterVal.year === 'all' || filterVal.geners === 'all' || filterVal.area === 'all'){
  //     this.moviesList = this.moviesListCopy;
  //   }

  //   if(filterVal.year !== 'all'){
  //     if(filterVal.year === 'other'){
  //       this.moviesList = this.moviesListCopy.filter(movie => {
  //         return movie.year <= +filterVal.year;
  //       });
  //     }else{
  //       this.moviesList = this.moviesListCopy.filter(movie => {
  //         return movie.year === +filterVal.year;
  //       });
  //     }
  //   }

  //   if(filterVal.genres !== 'all'){
  //     if(filterVal.genres !== 'other'){
  //       this.moviesList = this.moviesListCopy.filter(movie => {
  //         return movie.geners.includes(filterVal.genres);
  //       });
  //     }
  //   }
  // }
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
