import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.model';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movieToShow: Movie;
  id: number;
  
  constructor(private movieService : MoviesService,
              private router:Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = +params['id'];
        console.log(this.id);
        //this.movieToShow = this.movieService.getMovieById(this.id);
      }
    );
  }

  goBack(){
    this.location.back();
  }

}
