import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Movie } from '../models/movie.model';
import { MoviesService } from '../services/movies.service';
import { UserService } from '../services/user.service';
import { DeleteConfirmComponent } from '../partials/delete-confirm/delete-confirm.component';


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  private subscription : Subscription;
  modalRef: BsModalRef;
  movieToEdit: Movie = new Movie("","","","","",0,[],[],[],"",0,0,0,0,[]);
  token: string = "";
  isLoggedin: boolean = false;
  movieId: string;

  private stars ={
    fullStars:0,
    halfStar:0,
    emptyStars:0
  }
  
  constructor(private moviesService : MoviesService,
              private userService:UserService,
              private route: ActivatedRoute,
              private location:Location,
              private modalService:BsModalService,
              private router:Router) { }

  ngOnInit(){
    this.subscription = this.route.params
    .subscribe((params:Params)=>{ 
        this.movieId = params['id']; // get movie-id from current url
        this.moviesService.getMovieById(this.movieId) // search the movie from serve by movie-id
        .subscribe((data) => { 
          this.movieToEdit = data; // get movie detailed information

          // show the movie rating by stars
          var totalS = +(this.movieToEdit.rating).toFixed();
          this.stars.fullStars = Math.floor(totalS/2);
          this.stars.halfStar = totalS%2;
          this.stars.emptyStars = 5 - this.stars.fullStars - this.stars.halfStar;
        });
      }
    );
  }

  
  /*******************************************************
   * UPDATE moive info by id
   * Test: No
   * Request: POST{
   *    id,
   *    token,
   *    updateMovieValue
   * }
   * Response: {
   *    status,
   *    message
   * }
   ********************************************************/
  public updateMovie(){
    console.log(this.movieToEdit);    

    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is loggedin
      if(res=="true"){
        this.token = this.userService.getToken();
        const updateData = {
          id : this.movieToEdit._id,
          token : this.token,
          type: "movie",
          value: this.movieToEdit
        }
        
        // update movie data by pass the new value to server
        this.moviesService.updateMoiveById(updateData)
        .subscribe((updatedRes)=>{
          console.log(updatedRes);
          // check the server response
          if(updatedRes['status'] == "true"){
            //get updated movie value 
            this.movieToEdit = updatedRes['message'];
          }else{
            console.log("Fail to update.");
          }
        });
      }else{
        // if user is not loggedin , show popup login page
        console.log("loggin expired.")
      }
    });  
  }

  /*******************************************************
   * DELETE moive by id
   * Test: No
   * Request: POST{
   *    id,
   *    token,
   *    updateValue = ""
   * }
   * Response: {
   *    status,
   *    message
   * }
   ********************************************************/
  public deleteMovie(){
    
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is loggedin
      if(res=="true"){
        const initialState = {
          title: this.movieToEdit.title,
          imgPath: this.movieToEdit.smallImagePath
        }
        this.modalRef = this.modalService.show(DeleteConfirmComponent,{initialState});
        this.modalRef.content.deleteEvent
        .subscribe((confirm)=>{
          if(confirm == 'true'){
            const deleteData = {
              id : this.movieToEdit._id,
              token : this.userService.getToken(),
            }
            this.moviesService.deleteMoiveById(deleteData)
            .subscribe((deleteRes)=>{
              if(deleteRes['status'] == "true"){
                // Delete successfully
                console.log("delete successfull!");
                // redirct to home page
                this.router.navigateByUrl('/movies');
              }else{
                console.log("Fail to delete.");
              }
            });
          }
        });
      }
    });  
  }

  public goBack(){
    this.location.back();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
