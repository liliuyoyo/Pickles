import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private subscription : Subscription;
  movieToShow: Movie;
  id: string;
  
  constructor(private moviesService : MoviesService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(){
    this.subscription = this.route.params
    .subscribe((params:Params)=>{ 
        this.id = params['id']; // get movie-id from current url
        this.moviesService.getMovieById(this.id) // search the movie from serve by movie-id
        .subscribe(data => { this.movieToShow = data; });
      }
    );
  }

  // Back to the last page.
  goBack(){
    this.location.back();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
