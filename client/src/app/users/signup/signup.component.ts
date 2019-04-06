//need to install these below:
//  npm install --save jquery @types/jquery --save ng2-password-strength-bar --save

import { Component, OnInit, OnDestroy, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DataService} from 'src/app/services/data.service';
import { User } from 'src/app/models/user.model';
import { DataToSend } from 'src/app/models/data-to-send.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit, AfterViewInit, OnDestroy {
  usertoSend: User=new User("","","","","",true,[]);
  //for switch the class of prompt spans
  username_id:number=1;
  email_id:number=1;
  password_id:number=1;
  agree_id:number=1;

  //for check valiation
  username_valid:boolean=false;
  email_valid:boolean=false;
  password_valid:boolean=false;

  //for check exist
  userToCheckUsername: User=new User("","","","","",true,[]);
  userToCheckEmail: User=new User("","","","","",true,[]);

  //for password strength
  public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

  //for pass data to welcome page
  data: DataToSend = new DataToSend("");

  constructor(
    private userService : UserService,
    private dataService : DataService,
    private router: Router,
    private elementRef:ElementRef,
    private modalService: NgbModal,
    ){}

  ngOnInit() {
    //start listeners when page is loaded, param is SignupComponent
    this.listeners(this);
  }
  ngAfterViewInit() {
    //focus on username input after loading page every time
    $('#username').trigger("focus");
  }

  signup() {
    if(!$('#agree').is(':checked')){
      $("#agree-info").text("Please agree to the privacy policy.");
      this.agree_id=1;
      $("#agree-info").css({
        "left":$("#agree").offset().left - 1.7*$("#agree").width(),
        "top":$("#agree").offset().top - 2.5*$("#agree").width(),
        "display":"inline","text-align":"center",});
      $("#agree-info").show();
    }
    if(this.username_valid==true&&
      this.email_valid==true&&
      this.password_valid==true&&
      $('#agree').is(':checked')
      ){
      this.userService.signup(this.usertoSend)
      .subscribe(data =>
      {
        if(data=="true"){
          //--->jump to signup loading page and then jump to singup successful page.
          this.router.navigateByUrl("welcome");
        }
        else{
          //--->popup something wrong page
        }
      }); 
      this.username_valid=false;
      this.email_valid=false;
      this.password_valid=false;
    }
  }

  listeners(signup:any){
    //hide the prompt spans firstly
    $("span").hide();

    //********Username Events********

    //focus
    $("#username").focus(function(){
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
      signup.username_valid=false;
      $("#username-info").text("");
      signup.username_id=0;
      let isAlphanumeric=/^[A-Za-z0-9]+$/; 
      var username=$("#username").val();
      if(username==""){
        signup.username_valid=false;
        $("#username-info").hide();
      }
      else if(isAlphanumeric.test(String(username).toLowerCase())){
        //send user{username:"username.value",email:"?",password:"?",_id:"",...}
        //  to back end, check if username exists.
        signup.userToCheckUsername.username=signup.usertoSend.username;
        signup.userService.checkUsername(signup.userToCheckUsername)
        .subscribe(data =>
        {
          //username exists
          if(data=='false'){
            $("#username-info").text("Username already exists.");
            signup.username_id=2;
          }
          else{
            $("#username-info").hide();
            signup.username_valid=true;
          }
        }); 
      }
      else{
        signup.username_valid=false;
        $("#username-info").text("Please enter a valid username");
        signup.username_id=2;
      }
    });

    //********Eamil Events********
    
    //focus
    $("#email").focus(function(){
      $("#email-info").text("The email field should be a valid email address (abc@def.xyz). Everything is alphanumeric, except “@”. There can be any number of characters before and after “@” and there will be three characters after dot.");
      signup.email_id=1;
      $("#email-info").css({
        "left":$("#email").offset().left + 1.12*$("#email").width(),
        "top":$("#email").offset().top,
        "display":"inline"});
      $("#email-info").show();
    });

    //blur
    $("#email").blur(function(){
      signup.email_valid=false;
      $("#email-info").text("");
      signup.email_id=0;
      var isEmail=/^[A-Za-z\d]+([A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{3}$/;
      var email=$("#email").val();
      if(email==""){
        signup.email_valid=false;
        $("#email-info").hide();
      }
      else if(isEmail.test(String(email).toLowerCase())){
        //send user{username:"?",email:"email.value",password:"?",_id:"",...}
        //  to back end, check if email exists.
        signup.userToCheckEmail.email=signup.usertoSend.email;
        signup.userService.checkEmail(signup.userToCheckEmail)
        .subscribe(data =>
        {
          //email exists
          if(data=='false'){
            $("#email-info").text("Email already exists.");
            signup.email_id=2;
          }
          else{
            $("#email-info").hide();
            signup.email_valid=true;
          }
        }); 
      }
      else{
        signup.email_valid=false;
        $("#email-info").text("Please enter a valid email");
        signup.email_id=2;
      }
    });

    //********Password Events********
    
    //focus
    $("#password").focus(function(){
      $("#password-info").text("The password field should be at least 6 characters long.");
      $("#password-info").css({
        "left":$("#password").offset().left + 0.94*$("#password").width(),
        "top":$("#password").offset().top ,
        "display":"inline"});
      signup.password_id=1;
      $("#password-info").show();
    });
    
    //blur
    $("#password").blur(function(){
      signup.password_valid=false;
      $("#password-info").text("");
      signup.password_id=0;
      var isMoreThanSixChars=/^.{6,}$/;
      var password=$("#password").val();
      if(password==""){
        signup.password_valid=false;
        $("#password-info").hide();
      }
      else if(isMoreThanSixChars.test(String(password).toLowerCase())){
        signup.password_valid=true;
        $("#password-info").hide();
      }
      else{
        signup.password_valid=false;
        $("#password-info").text("Please enter a valid password");
        signup.password_id=2;
       }
    });

    //********Agree box Events********
    
    //click
    $("#agree").click(function(){
      $("#agree-info").text("");
      signup.agree_id=0;
      $("#agree-info").hide();
    });
  }

 
  //policy popup window
  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  //send data to data service
  ngOnDestroy() {
    this.data.welcomeUserName = this.usertoSend.username;
    this.dataService.dataToSend = this.data; 
  }

  //--->if continue, add code here
}