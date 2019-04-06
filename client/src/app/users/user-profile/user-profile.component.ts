import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  curUser: User=new User("","","","","",true,[]);
  wishList: any;
  token: string;
  havePaginate: boolean = true;
  haveWishList: boolean = true;

  constructor(private userService : UserService,
    private moviesService : MoviesService,
    ) { }

  ngOnInit() {
    //open user info and wish list
    $('#btn-wish-list').trigger("click");
    $('#btn-user-info').trigger("click");
    $('#btn-history').trigger("click");

    //send token to back end and get info of user
    this.token = this.userService.getToken()  
    this.userService.getLoginedUser(this.token)
      .subscribe(data =>
      {
        console.log(data);
        if(data['status']=="true")
        {
          this.curUser.username=data['name'];
          this.curUser.email=data['email'];
          this.curUser.image=data['image'];
          this.wishList=data['list'];
          if(this.wishList.length<=8){
            this.havePaginate=false;
          }
          if(this.wishList.length==0){
            this.haveWishList=false;
          }
        }
        else{
          //to add a popup window
        }
      }); 
  }

  //delete movie from user wish list
  public deleteFormUserWishList(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var movieId = idAttr.nodeValue;
    const updateData = {
      id : movieId,
      token : this.token,
      type: "wishlist",
      value: "false"
    }
    this.moviesService.updateMoiveById(updateData)
    .subscribe((updatedRes)=>{
      if(updatedRes['status'] == "true"){
        console.log("Successfully remove to user's movie list");
        this.userService.getLoginedUser(this.token)
        .subscribe(data =>
        {
          console.log(data);
          if(data['status']=="true")
          {
            this.curUser.username=data['name'];
            this.curUser.email=data['email'];
            this.curUser.image=data['image'];
            this.wishList=data['list'];
            if(this.wishList.length<=8){
              this.havePaginate=false;
            }
            if(this.wishList.length==0){
              this.haveWishList=false;
            }
          }
          else{
            //to add a popup window
          }
        }); 
      }
      else{
        //to be deleted
        console.log(updatedRes['message']);
      }
    }); 
  }
  
  //
  trackingFunction(index:number, item:Object) : number {
    return item["value"]
  }

  //add new function here
}
