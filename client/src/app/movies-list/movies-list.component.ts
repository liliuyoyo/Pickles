import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { Subscription } from 'rxjs';
import { PaginationComponent } from '../partials/pagination/pagination.component';
import { ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  
  private subscription : Subscription;
  moviesList: Movie[];
  pager:any;
  @ViewChild(PaginationComponent) child;
  

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    //get intial pager
    this.pager = this.child.pager;

    // this.moviesService.getMovies()
    // .subscribe( data => {
    //   this.moviesList = data;
    // });

    this.subscription = this.moviesService.searchEvent
    .subscribe( str => {
      this.moviesService.searchMoviesByString(str)
      .subscribe(data => this.moviesList = data);
    });

    this.moviesService.getMoviesByPage(this.pager.currentPage,this.pager.pageLimit)
    .subscribe((data)=>{
      this.moviesList = data;
    });
  }

  filterMovies(filterVal : any){
    this.moviesService.searchMovies(filterVal)
    .subscribe(data => {
      this.moviesList = data;
    });;
  }

  public refreshMoviesPage(newPager:any){
    this.pager = newPager;
    this.moviesService.getMoviesByPage(this.pager.currentPage,this.pager.pageLimit)
    .subscribe((data)=>{
      this.moviesList = data;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
