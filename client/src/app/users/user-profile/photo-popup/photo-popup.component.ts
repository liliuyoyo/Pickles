import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-photo-popup',
  templateUrl: './photo-popup.component.html',
  styleUrls: ['./photo-popup.component.css'],
  providers: [BsModalService]
})
export class PhotoPopupComponent implements OnInit {
  token: string = "";
  movieLink: string = "";
  msg: string;
  prevUserPhoto: string;
  prevHeight: number;

  constructor(public bsModalRef: BsModalRef,
    private userService:UserService
    ) { }

  ngOnInit() {
    //get current user info
    this.token = this.userService.getToken();
    this.prevUserPhoto=this.userService.prevUserPhoto;

    //set user photo height = width
    // this.prevHeight = $(".user-prev-image").width();
    // $(".user-prev-image").css("height",this.prevHeight );
    // console.log(this.prevHeight);

    //link user photo from service
    this.userService.currentUserPhoto
      .subscribe(
        photo => this.msg = photo
        )
  }

  ngAfterViewInit() {
    // $('#photo-link').focus();
  }
  
  upLoadPhoto(){
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is loggedin
      if(res=="true"){
        this.token = this.userService.getToken();
        const updateData = {
          token : this.token,
          type: "image",
          value: this.movieLink,
        }
        
        // update movie data by pass the new value to server
        this.userService.uploadPhoto(updateData)
        .subscribe(data=>{
          // check the server response
          if(data['status']=="true"){
            var userinfo=data['message']
            this.userService.changeUserPhoto(userinfo.userImage);
            this.bsModalRef.hide();
          }
          else{
            console.log("Fail to upload.")
          }
        });  
      }else{
        // if user is not loggedin , show popup login page
        console.log("loggin expired.")
      }
    });  
  }

}
