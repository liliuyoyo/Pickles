import { Component, OnInit,ElementRef} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { AddCommentComponent } from './add-comment/add-comment.component';
import { LoginPopupComponent } from '../users/login-popup/login-popup.component';
import { MoviesService } from 'src/app/services/movies.service';
import { UserService } from '../services/user.service';
import { Movie } from 'src/app/models/movie.model';



@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private subscription : Subscription;
  modalRef: BsModalRef;
  movieToShow: Movie;
  token: string;
  isLoggedin: boolean = false;
  isAdmin: boolean = false;
  movieId: string;
  isClickLike: boolean = false;
  isClickWatched: boolean = false;
  isClickWishList: boolean = false;

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
        this.movieId = params['id']; // get movie-id from current url
        this.moviesService.getMovieById(this.movieId) // search the movie from serve by movie-id
        .subscribe((data) => { 
          this.movieToShow = data; // get movie detailed information

          // show the movie rating by stars
          var totalS = +(this.movieToShow.rating).toFixed();
          this.stars.fullStars = Math.floor(totalS/2);
          this.stars.halfStar = totalS%2;
          this.stars.emptyStars = 5 - this.stars.fullStars - this.stars.halfStar;

          /*******************************************************
           *  check whether the movie is in user's wishlist
           *******************************************************/
          this.token = this.userService.getToken();
          if(this.token != null){
              this.userService.getLoginedUser(this.token)
              .subscribe((res)=>{
                  if(res['status']=='true'){
                     const wishlist = res['list'];
                     wishlist.forEach(movie => {
                         if(movie.id == this.movieToShow._id){
                             this.isClickWishList = true;
                         }
                     });
                  }else{
                      console.log("error");
                  }
              });
            }
        });

        this.userService.getLoginedUser(this.userService.getToken())
        .subscribe((res)=>{
          if(res.status == 'true'){
            this.isAdmin = !res.isuser;
          }
       });
      }
    );
  }

  // Back to the last page.
  goBack(){
    this.location.back();
  }

  /*******************************************************
   *  Increase / Descrease 'likes' or 'watched' numbers
   *******************************************************/
  public updateLikeWatched(updateType:string,upDown:string){
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is loggedin
      if(res=="true"){
        this.token = this.userService.getToken();
        const updateData = {
          id : this.movieToShow._id,
          token : this.token,
          type: updateType,
          value: 0
        }
        // check the update Type : likes / watched
        if(updateType == 'likes'){
          if(upDown == "up"){
            updateData.value = this.movieToShow.likes + 1;
            this.isClickLike = true;
          }else{
            updateData.value = this.movieToShow.likes - 1;
            this.isClickLike = false;
          }
        }else{ // check is operation: increase / decrease
          if(upDown == "up"){
            updateData.value = this.movieToShow.watched + 1;
            this.isClickWatched = true;
          }else{
            updateData.value = this.movieToShow.watched - 1;
            this.isClickWatched = false;
          }
        }
        
        // update movie data by pass the new value to server
        this.moviesService.updateMoiveById(updateData)
        .subscribe((updatedRes)=>{
          // check the server response
          if(updatedRes['status'] == "true"){
            if(updateType == "likes"){
              this.movieToShow.likes = updatedRes['message'].likes;
            }else{
              this.movieToShow.watched = updatedRes['message'].watched;
            }
          }else{
            console.log("Fail to update.");
          }
        });
      }else{
        // if user is not loggedin , show popup login page
        this.modalRef = this.modalService.show(LoginPopupComponent);
      }
    });  
  }

  /*******************************************************
   *  Add a new comment to current movie
   *******************************************************/
  public addNewComment(){
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is logged in
      if(res=="true"){

        // show the add comment window
        this.modalRef = this.modalService.show(AddCommentComponent);
        this.modalRef.content.addCommentEvent.subscribe((commentTxt) => {
          // if user entered comment text
          if(commentTxt != undefined){
            this.token = this.userService.getToken();
            const updateData = {
              id : this.movieToShow._id,
              token : this.token,
              type: "comments",
              value: commentTxt
            }
            this.moviesService.updateMoiveById(updateData)
            .subscribe((updatedRes)=>{
              if(updatedRes['status'] == "true"){
                this.movieToShow.comments.unshift(updatedRes['message']);
              }else{
                console.log("Fail to add new comment");
              }
            });
          }else{
            // if the comment text is empty or undefined
            console.log("hah? Nothing to say?");
          }
        });
      }else{
        // if user is not loggedin , show popup login page
        this.modalRef = this.modalService.show(LoginPopupComponent);
      }
    });  
  }

  /*******************************************************
   *  Add / Remove the movie to/from user's wishlist
   *******************************************************/
  public updateUserWishList(type:string){
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is logged in
      if(res=="true"){
        this.token = this.userService.getToken();
        const updateData = {
          id : this.movieToShow._id,
          token : this.token,
          type: "wishlist",
          value: "false"
        }

        if(type == "add"){
            updateData.value = "true";
        }

        this.moviesService.updateMoiveById(updateData)
        .subscribe((updatedRes)=>{
          if(updatedRes['status'] == "true"){
            if(type == 'add'){
              console.log("Successfully add to user's movie list");
              this.isClickWishList= true;  
            }else{
              console.log("Successfully remove to user's movie list");
              this.isClickWishList= false;
            }
          }else{
            console.log(updatedRes['message']);
          }
        });

      }else{
        // if user is not loggedin , show popup login page
        this.modalRef = this.modalService.show(LoginPopupComponent);
      }
    });  
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
