import { Component, OnInit,ElementRef} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from '../services/user.service';
import { Movie } from 'src/app/models/movie.model';
import { Subscription } from 'rxjs';
import { AddCommentComponent } from './add-comment/add-comment.component';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private subscription : Subscription;
  movieToShow: Movie;
  token: string;
  isLoggedin: boolean = false;
  id: string;
  modalRef: BsModalRef;
  private stars ={
    fullStars:0,
    halfStar:0,
    emptyStars:0
  }
  
  constructor(private moviesService : MoviesService,
              private userService:UserService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private location: Location,
              private elementRef : ElementRef) { }

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

  public increaseLike(){
    //this.elementRef.nativeElement.querySelector('#likeBtn').setAttribute('disabled',"true");
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      if(res=="true"){
        this.token = this.userService.getToken();
        const updateData = {
          id : this.movieToShow._id,
          token : this.token,
          type: "likes",
          value: this.movieToShow.likes + 1
        }
        this.moviesService.updateMoiveById(updateData)
        .subscribe((updatedRes)=>{
          if(updatedRes['status'] == "true"){
            this.movieToShow.likes = updatedRes['message'].likes;
            this.elementRef.nativeElement.querySelector('#likeBtn').setAttributes("disabled","true");
          }else{
            //show error message;   updatedRes['message'];
          }
        });
      }else{
        //this.modalRef = this.modalService.show(LoginComponent);
      }
    });  
  }

  public addNewComment(){
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      if(res=="true"){
        this.modalRef = this.modalService.show(AddCommentComponent);
        this.modalRef.content.addCommentEvent.subscribe((commentTxt) => {
          console.log(commentTxt);
          });
      }else{
        //this.modalRef = this.modalService.show(LoginComponent);
      }
    });  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
