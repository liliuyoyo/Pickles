import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PhotoPopupComponent } from 'src/app/users/user-profile/photo-popup/photo-popup.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  curUser: User=new User("","","","","",true,[]);
  wishList: any;
  historyList: any;
  token: string;
  
  haveWLPaginate: boolean = true;
  haveWishList: boolean = true;
  haveHistoryList: boolean = true;
  haveHLPaginate: boolean = true;

  modalRef: BsModalRef;

  constructor(private userService : UserService,
    private moviesService : MoviesService,
    private router: Router,
    private modalService: BsModalService,
    ) { }

  ngOnInit() {
    //open user info and wish list
    $('#btn-wish-list').trigger("click");
    $('#btn-user-info').trigger("click");
    $('#btn-history').trigger("click");

    //send token to back end and get info of user
    this.token = this.userService.getToken()  
    this.getUserInfo();

    //link user photo from service
    this.userService.currentUserPhoto
      .subscribe(
        photo => this.curUser.image = photo
        )
  }

  //delete movie from user wish list
  public deleteFormUserWishList(id:any){
    const updateData = {
      id : id,
      token : this.token,
      type: "wishlist",
      value: "false"
    }
    this.moviesService.updateMoiveById(updateData)
    .subscribe((updatedRes)=>{
      if(updatedRes['status'] == "true"){
        console.log("Successfully remove to user's movie list");
        this.getUserInfo();
      }
      else{
        //to be deleted
        console.log(updatedRes['message']);
      }
    }); 
  }
  
  //track and update wish list when deleted a movie
  trackingFunction(index:number, item:Object) : number {
    return item["value"];
  }


  //get user info
  getUserInfo(){
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
        this.historyList=data['history'];
        if(this.wishList.length<=8){
          this.haveWLPaginate=false;
        }
        if(this.wishList.length==0){
          this.haveWishList=false;
        }
        if(this.historyList.length<=8){
          this.haveHLPaginate=false;
        }
        if(this.historyList.length==0){
          this.haveHistoryList=false;
        }
      }
      else{
        //to add a popup window
      }
    }); 
  }

   // direct to the movie-detail page
  getMoiveDetail(id:any){
    this.router.navigateByUrl('/movies/'+ id);
  }
  
  //popup upload photo window
  popupPhototChange(){
    this.userService.prevUserPhoto=this.curUser.image;
    this.modalRef = this.modalService.show(PhotoPopupComponent);
  }

  //add new function here
}
