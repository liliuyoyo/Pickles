import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MoviesService } from 'src/app/services/movies.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  token: string;
  userStars:number;

  @Input() movieId: string;

  constructor(private userService : UserService,
    private moviesService : MoviesService,
    ) { }

  ngOnInit() {
    //send token to back end and get info of user
    this.token = this.userService.getToken();
    this.listeners(this);  
  }
  public listeners(starating: any){
    $('.stars .fas').on('click', function() {
      starating.userStars=$(this).data('rating')
      const updateData = {
        id : starating.movieId,
        token : starating.token,
        type: "rating",
        value: starating.userStars,
      }
      starating.uploadRating(updateData);
    });
  }
  public uploadRating(updateData:any){
      this.moviesService.updateMoiveById(updateData)
      .subscribe((updatedRes)=>{
        if(updatedRes['status'] == "true"){
          console.log("Successfully rating!");
          window.location.reload();
        }
        else{
          console.log(updatedRes['message']);
        }
      }); 
    }
}
