import { Component, OnInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  private subscription : Subscription;
  modalRef: BsModalRef;
  movieToShow: Movie;
  token: string;
  isLoggedin: boolean = false;
  movieId: string;

  private stars ={
    fullStars:0,
    halfStar:0,
    emptyStars:0
  }
  
  constructor(private moviesService : MoviesService,
              private userService:UserService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private elementRef : ElementRef) { }

  ngOnInit(){
    this.subscription = this.route.params
    .subscribe((params:Params)=>{ 
        this.movieId = params['id']; // get movie-id from current url
        this.moviesService.getMovieById(this.movieId) // search the movie from serve by movie-id
        .subscribe((data) => { 
          this.movieToShow = data; // get movie detailed information

          // show the movie rating by stars
          var totalS = +(this.movieToShow.rating).toFixed();
          this.stars.fullStars = Math.floor(totalS/2);
          this.stars.halfStar = totalS%2;
          this.stars.emptyStars = 5 - this.stars.fullStars - this.stars.halfStar;
        });
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
