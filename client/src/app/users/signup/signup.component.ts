//need to install these below:
//  npm install --save jquery
//  npm install @types/jquery --save
//  npm install ng2-password-strength-bar --save

import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  usertoSend: User=new User("","","","","",true);

  //for switch the class of prompt spans
  username_id:number;
  email_id:number;
  password_id:number;

  //for check valiation
  username_valid:boolean=false;
  email_valid:boolean=false;
  password_valid:boolean=false;

  //for password strength
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];
  public strengthLabels = ['', 'Weak', 'Normal', 'Strong', 'Great!'];

  private subscription : Subscription;

  constructor(private userService : UserService,
    private router: Router,
    private elementRef:ElementRef
    ){}

  ngOnInit() {
    //start listeners when page is loaded, param is SignupComponent
    this.listeners(this);
  }
  
  signup() {
    if(this.username_valid==true&&
      this.email_valid==true&&
      this.password_valid==true&&
      $('#agree').is(':checked')
      ){
        console.log("yse");
      // this.userService.sendToBackend(this.usertoSend)
      // .subscribe(data =>
      // {
      //   if(data==true){
      //     console.log(data);
      //     //jump to signup loading page and then jump to singup successful page.
      //   }
      //   else{
      //     //jump to signup loading page(prompt something is wrong!)
      //   }
      // }); 
    }
    
  }
  
  listeners(signup:any){
    //hide the prompt spans firstly
    $("span").hide();

    //********Username Events********

    //focus
    $("#username").focus(function(){
      $("#username-info").removeClass();
      $("#username-info").text("The username field must contain only alphabetical or numeric characters.");
      $("#username-info").css({
        "left":$("#username").offset().left + 1.12*$("#username").width(),
        "top":$("#username").offset().top ,
        "display":"inline"});
      signup.username_id=1;
      $("#username-info").show();
    });

    //blur
    $("#username").blur(function(){
      $("#username-info").text("");
      signup.username_id=0;
      let isAlphanumeric=/^[A-Za-z0-9]+$/; 
      var username=$("#username").val();
      if(username==""){
        $("#username-info").hide();
      }
      else if(isAlphanumeric.test(String(username).toLowerCase())){
        //send user{username:"username.value",email:"?",password:"?",_id:"",...}
        //  to back end, check if username exists.
        signup.userService.sendToBackend(signup.usertoSend)
        .subscribe(data =>
        {
          //username exists
          if(data==false){
            $("#username-info").text("Username already exists.");
            signup.username_id=2;
          }
          else{
            signup.username_valid=true;
          }
        }); 
      }
      else{
        $("#username-info").text("Please enter a valid username");
        signup.username_id=2;
      }
    });

    //********Eamil Events********
    
    //focus
    $("#email").focus(function(){
      $("#email-info").removeClass();
      $("#email-info").text("The email field should be a valid email address (abc@def.xyz). Everything is alphanumeric, except “@”. There can be any number of characters before and after “@” and there will be three characters after dot.");
      $("#email-info").css({
        "left":$("#email").offset().left + 1.12*$("#email").width(),
        "top":$("#email").offset().top ,
        "display":"inline"});
      signup.email_id=1;
      $("#email-info").show();
    });

    //blur
    $("#email").blur(function(){
      $("#email-info").text("");
      signup.email_id=0;
      var isEmail=/^[A-Za-z\d]+([A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{3}$/;
      var email=$("#email").val();
      if(email==""){
        $("#email-info").hide();
      }
      else if(isEmail.test(String(email).toLowerCase())){
        //send user{username:"?",email:"email.value",password:"?",_id:"",...}
        //  to back end, check if email exists.
        signup.userService.sendToBackend(signup.usertoSend)
        .subscribe(data =>
        {
          //email exists
          if(data==false){
            $("#email-info").text("Email already exists.");
            signup.email_id=2;
          }
          else{
            signup.email_valid=true;
          }
        }); 
      }
      else{
        $("#email-info").text("Please enter a valid email");
        signup.email_id=2;
      }
    });

    //********Password Events********
    
    //focus
    $("#password").focus(function(){
      $("#password-info").removeClass();
      $("#password-info").text("The password field should be at least 6 characters long.");
      $("#password-info").css({
        "left":$("#password").offset().left + 1.12*$("#password").width(),
        "top":$("#password").offset().top ,
        "display":"inline"});
      signup.password_id=1;
      $("#password-info").show();
    });
    
    //blur
    $("#password").blur(function(){
      $("#password-info").text("");
      signup.password_id=0;
      var isMoreThanSixChars=/^.{6,}$/;
      var password=$("#password").val();
      if(password==""){
        $("#password-info").hide();
      }
      else if(isMoreThanSixChars.test(String(password).toLowerCase())){
        signup.password_valid=true;
      }
      else{
        $("#password-info").text("Please enter a valid password");
        signup.password_id=2;
       }
    });

    //if continue, add code here

  }
}