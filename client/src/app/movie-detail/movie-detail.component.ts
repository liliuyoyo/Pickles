import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
              private router:Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(){
    this.subscription = this.route.params.subscribe(
      (params:Params)=>{
        this.id = params['id'];
        console.log(this.id);
        this.moviesService.getMovieById(this.id)
                            .subscribe(data => {
                          this.movieToShow = data;
                          });

        console.log(this.movieToShow);
      }
    );

    
  }

  goBack(){
    this.location.back();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
