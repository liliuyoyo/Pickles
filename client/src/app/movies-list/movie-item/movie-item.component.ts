import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { Movie } from 'src/app/models/movie.model';
import { UserService } from 'src/app/services/user.service';
import { MoviesService } from 'src/app/services/movies.service';
import { DeleteConfirmComponent } from 'src/app/partials/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input() movie:Movie;
  @Input() isAdmin:boolean;
  modalRef: BsModalRef;


  constructor(private router: Router,
              private userService:UserService,
              private movieService:MoviesService,
              private modalService:BsModalService,) { }

  ngOnInit() {
    
  }

  // direct to the movie-detail page
  getMoiveDetail(){
    this.router.navigateByUrl('/movies/'+ this.movie._id);
  }

  // direct to the movie-edit page
  onEditMovie(){
    this.router.navigateByUrl('/movies/edit/'+this.movie._id);
  }

  onDeleteMovie(){
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is loggedin
      if(res=="true"){
        const initialState = {
          title: this.movie.title,
          imgPath: this.movie.smallImagePath
        }
        this.modalRef = this.modalService.show(DeleteConfirmComponent,{initialState});
        this.modalRef.content.deleteEvent
        .subscribe((confirm)=>{
          if(confirm == 'true'){
            const deleteData = {
              id : this.movie._id,
              token : this.userService.getToken(),
            }
            this.movieService.deleteMoiveById(deleteData)
            .subscribe((deleteRes)=>{
              if(deleteRes['status'] == "true"){
                // Delete successfully
                console.log("delete successfull!");
                // redirct to home page
                window.location.reload();
              }else{
                console.log("Fail to delete.");
              }
            });
          }
        });
      }
    });  
  }

}
