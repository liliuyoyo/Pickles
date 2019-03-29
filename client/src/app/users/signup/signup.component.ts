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
  usersList: User[];
  id:number;
  private subscription : Subscription;

  constructor(private userService : UserService,
    private router: Router,
    private elementRef:ElementRef)
  {
  }

  ngOnInit() {
    this.listeners(this);
    this.userService.getAllUsers()
    .subscribe(data =>
    {
      this. usersList = data;
    }); 
  }
  
  signup() {
    this.userService.sendToBackend(this.usertoSend)
    .subscribe(data =>
    {
      console.log(data);
    }); 
  }
  listeners(signup){
    $("span").hide();

    $("#username").focus(function(){
      $("#username-info").removeClass();
      $("#username-info").text("The username field must contain only alphabetical or numeric characters.");
      $("#username-info").css({
        "left":$("#username").offset().left + 1.12*$("#username").width(),
        "top":$("#username").offset().top ,
        "display":"inline"});
      signup. addClass(11);
      $("#username-info").show();
    });
    $("#email").focus(function(){
      $("#email-info").removeClass();
      $("#email-info").text("The email field should be a valid email address (abc@def.xyz). Everything is alphanumeric, except “@”. There can be any number of characters before and after “@” and there will be three characters after dot.");
      $("#email-info").css({
        "left":$("#email").offset().left + 1.12*$("#email").width(),
        "top":$("#email").offset().top ,
        "display":"inline"});
      signup. addClass(21);
      $("#email-info").show();
    });
    $("#password").focus(function(){
      $("#password-info").removeClass();
      $("#password-info").text("The password field should be at least 6 characters long.");
      $("#password-info").css({
        "left":$("#password").offset().left + 1.12*$("#password").width(),
        "top":$("#password").offset().top ,
        "display":"inline"});
      signup. addClass(31);
      $("#password-info").show();
    });
    $("#username").blur(function(){
      signup. addClass(0);
      let isAlphanumeric=/^[A-Za-z0-9]+$/; 
      var username=$("#username").val();
      if(username==""){
        $("#username-info").hide();
      }
      else if(isAlphanumeric.test(String(username).toLowerCase())){
        $("#username-info").text("OK");
        signup. addClass(12);
      }
      else{
        $("#username-info").text("Error");
        signup. addClass(13);
      }
    });
    $("#password").blur(function(){
      signup. addClass(0);
      $("#password-info").removeClass();
      var isMoreThanSixChars=/^.{6,}$/;
      var password=$("#password").val();
      if(password==""){
        $("#password-info").hide();
      }
      else if(isMoreThanSixChars.test(String(password).toLowerCase())){
        $("#password-info").text("OK");
        $("#password-info").addClass("ok");
      }
      else{
          $("#password-info").text("Error");
          $("#password-info").addClass("error");
       }
    });
    $("#email").blur(function(){
      signup. addClass(0);
      $("#email-info").removeClass();
      var isEmail=/^[A-Za-z\d]+([A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{3}$/;
      var email=$("#email").val();
      if(email==""){
        $("#email-info").hide();
      }
      else if(isEmail.test(String(email).toLowerCase())){
        $("#email-info").text("OK");
        $("#email-info").addClass("ok");
      }
      else{
        $("#email-info").text("Error");
        $("#email-info").addClass("error");
      }
    });
  }
  addClass(id: any) {
    this.id = id;
  }
}