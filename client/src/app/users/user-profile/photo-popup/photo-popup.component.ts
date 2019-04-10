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
  prevUserPhoto_tmp: string;
  prevUserPhoto: string;
  prevHeight: number;
  isLinkValid: boolean = false;
  passValidation: boolean = true;
  photoLink_id: number=1;

  constructor(public bsModalRef: BsModalRef,
    private userService:UserService
    ) { }

  ngOnInit() {
    //get current user info
    this.token = this.userService.getToken();
    this.prevUserPhoto=this.userService.prevUserPhoto;
    this.prevUserPhoto_tmp=this.prevUserPhoto;

    //link user photo from service
    this.userService.currentUserPhoto
      .subscribe(
        photo => this.msg = photo
        )
    this.listener(this);  
  }

  ngAfterViewInit() {
    // $('#photo-link').focus();
  }
  
  upLoadPhoto(){
    this.checkEmpty();
    
    if(this.isLinkValid==true){
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
              console.log("Fail to upload.");
            }
          });  
        }else{
          // if user is not loggedin , show popup login page
          console.log("loggin expired.")
        }
      });  
    }
    else{
      console.log("Photo link is invalid.")
    }
  }

  public listener(photoPopup: any){
    //hide the prompt spans firstly
    $("span").hide();
    $("#photo-link").focus(function(){
      $("#photo-link").css({"border-color":"#ccc",});
    });
    $("#photo-link").blur(function(){
      photoPopup.blurEvents();
    });
  }
  
  updateUrl() {
    this.prevUserPhoto = this.prevUserPhoto_tmp;
    this.passValidation = false;
    this.isLinkValid=false;
    this.photoLink_id=1;
    $("#photo-link-info").text("Please enter a valid photo link");
    $("#photo-link-info").show();
  }

  //check if hoto link is empty
  public checkEmpty(){
    var photoLink = $("#photo-link").val();
    if(photoLink==""){
      this.isLinkValid=false;
      $("#photo-link").css({
        "border-style":"solid",
        "border-color":"rgb(255, 102, 102)",});
    }
  }
  

  //
  public blurEvents(){
    var photoLink = $("#photo-link").val();
    this.isLinkValid = false;
    this.passValidation=true;
    $("#photo-link-info").text("");
    this.photoLink_id=0;
    if(photoLink==""){
      this.isLinkValid=false;
      $("#photo-link-info").hide();
    }
    else{
      this.prevUserPhoto = photoLink.toString();
      if(this.passValidation==true){
        this.isLinkValid=true;
        this.photoLink_id=0;
        $("#photo-link-info").hide();
      }
      else{
        this.isLinkValid=false;
        this.photoLink_id=1;
        $("#photo-link-info").text("Please enter a valid photo link");
        $("#photo-link-info").show();
      }
    } 
  }
  
  //add new function here
}
