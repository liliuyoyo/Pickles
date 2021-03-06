import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MoviesService } from 'src/app/services/movies.service';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginPopupComponent } from 'src/app/users/login-popup/login-popup.component';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  token: string;
  userStars:number;
  private stars ={
    fullStars:0,
    halfStar:0,
    emptyStars:0
  };
  rated: boolean = false;
  @Input() movieId: string;
  modalRef: BsModalRef;

  constructor(private userService : UserService,
    private moviesService : MoviesService,
    private modalService: BsModalService,
    ) { }

  ngOnInit() {
  }
  public listeners(event) {
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is loggedin
      if(res=="true"){
        this.token = this.userService.getToken();
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id;
        var value = idAttr.nodeValue;
        this.userStars= value;
        const updateData = {
          id : this.movieId,
          token : this.token,
          type: "rating",
          value: this.userStars,
        }
        this.uploadRating(updateData);
      }
      else{
        // if user is not loggedin , show popup login page
        this.modalRef = this.modalService.show(LoginPopupComponent);
      }
    });
    
  }

  public uploadRating(updateData:any){
      this.moviesService.updateMoiveById(updateData)
      .subscribe((updatedRes)=>{
        if(updatedRes['status'] == "true"){
          var totalS = +(updatedRes['message'].rating).toFixed();
          this.stars.fullStars = Math.floor(totalS/2);
          this.stars.halfStar = totalS%2;
          this.stars.emptyStars = 5 - this.stars.fullStars - this.stars.halfStar;
          this.moviesService.moiveRatingStars=this.stars;
          this.moviesService.moiveRating=updatedRes['message'].rating;
          this.rated = true;
          console.log("Successfully rating!");
        }
        else{
          this.rated=false;
          console.log(updatedRes['message']);
        }
      }); 
    }
}
