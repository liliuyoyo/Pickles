import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private subscription : Subscription;
  movieToShow: Movie;
  isLoggedin: boolean = false;
  id: string;
  private stars ={
    fullStars:0,
    halfStar:0,
    emptyStars:0
  }
  
  constructor(private moviesService : MoviesService,
              private userService:UserService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(){
    this.subscription = this.route.params
    .subscribe((params:Params)=>{ 
        this.id = params['id']; // get movie-id from current url
        this.moviesService.getMovieById(this.id) // search the movie from serve by movie-id
        .subscribe(data => { 
          this.movieToShow = data; 
          var totalS = +(this.movieToShow.rating).toFixed();
          this.stars.fullStars = Math.floor(totalS/2);
          this.stars.halfStar = totalS%2;
          this.stars.emptyStars = 5 - this.stars.fullStars - this.stars.halfStar;
        });
      }
    );
  }

  // Back to the last page.
  goBack(){
    this.location.back();
  }

  public addNewComment(){
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      console.log(res);
    });  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
