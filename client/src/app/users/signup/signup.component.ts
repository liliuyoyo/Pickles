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
  username_id: number=1;
  email_id: number=1;
  password_id: number=1;
  confirmPassword_id: number=1;
  agree_id: number=1;

  //for check valiation
  username_valid: boolean=false;
  email_valid: boolean=false;
  password_valid: boolean=false;
  confirmPassword_valid: boolean=false;

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
    this.blurEvents("agree");
    this.checkEmpty();
    if(this.username_valid==true&&
      this.email_valid==true&&
      this.password_valid==true&&
      this.confirmPassword_valid==true&&
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
          console.log("Database Error in signup.component.ts function signup().");
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
    //Username Events
    $("#username").focus(function(){
      signup.focusEvents("username");
    });
    $("#username").blur(function(){
      signup.blurEvents("username");
    });
    //Eamil Events
    $("#email").focus(function(){
      signup.focusEvents("email");
    });
    $("#email").blur(function(){
      signup.blurEvents("email");
    });
    //Password Events
    $("#password").focus(function(){
      signup.focusEvents("password");
    });
    $("#password").blur(function(){
      signup.blurEvents("password");
    });
    //Confirm Password Events
    $("#confirmPassword").focus(function(){
      signup.focusEvents("confirmPassword");
    });
    $("#confirmPassword").blur(function(){
      // signup.blurEvents("confirmPassword");
      signup.blurEvents("password");
    });
    //Agree box Events
    $("#agree").click(function(){
      signup.focusEvents("agree");
    });
  }

 
  //policy popup window
  public openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  //send data to data service
  ngOnDestroy() {
    this.data.welcomeUserName = this.usertoSend.username;
    this.dataService.dataToSend = this.data; 
  }

  //********Show prompt msg when focus on input element********
  private focusEvents(obj: string){
    if(obj == "username"){
      $("#username").css({"border-color":"#ccc",});
      $("#username-info").text("The username field must contain only alphabetical or numeric characters.");
      $("#username-info").css({
        "left":$("#username").offset().left + 1.12*$("#username").width(),
        "top":$("#username").offset().top+ 0.8*$("#username").height() ,
        "display":"inline"});
      this.username_id=1;
      $("#username-info").show();
    }
    else if(obj == "email"){
      $("#email").css({"border-color":"#ccc",});
      $("#email-info").text("The email field should be a valid email address (abc@def.xyz). Everything is alphanumeric, except “@”. There can be any number of characters before and after “@” and there will be three characters after dot.");
      this.email_id=1;
      $("#email-info").css({
        "left":$("#email").offset().left + 1.12*$("#email").width(),
        "top":$("#email").offset().top,
        "display":"inline"});
      $("#email-info").show();
    }
    else if(obj == "password"){
      $("#password").css({"border-color":"#ccc",});
      $("#password-info").text("The password field should be at least 6 characters long.");
      $("#password-info").css({
        "left":$("#password").offset().left + 0.94*$("#password").width(),
        "top":$("#password").offset().top ,
        "display":"inline"});
      this.password_id=1;
      $("#password-info").show();
    }
    else if(obj == "confirmPassword"){
      $("#confirmPassword").css({"border-color":"#ccc",});
    }
    else if(obj == "agree"){
      $("#agree-info").text("");
      this.agree_id=0;
      $("#agree-info").hide();
    }
    else{
      console.log("Wrong input param in signup.component function focusEvents(obj: string).");
    }
  }

  //********Show prompt msg when blur input element********
  private blurEvents(obj: string){
    if(obj == "username"){
      this.username_valid=false;
      $("#username-info").text("");
      this.username_id=0;
      let isAlphanumeric=/^[A-Za-z0-9]+$/; 
      var username=$("#username").val();
      if(username==""){
        this.username_valid=false;
        $("#username-info").hide();
      }
      else if(isAlphanumeric.test(String(username).toLowerCase())){
        //send user{username:"username.value",email:"?",password:"?",_id:"",...}
        //  to back end, check if username exists.
        this.userToCheckUsername.username=this.usertoSend.username;
        this.userService.checkUsername(this.userToCheckUsername)
        .subscribe(data =>
        {
          //username exists
          if(data=='false'){
            $("#username-info").text("Username already exists.");
            this.username_id=2;
          }
          else{
            $("#username-info").hide();
            this.username_valid=true;
          }
        }); 
      }
      else{
        this.username_valid=false;
        $("#username-info").text("Please enter a valid username");
        this.username_id=2;
      }
    }

    else if(obj == "email"){
      this.email_valid=false;
      $("#email-info").text("");
      this.email_id=0;
      var isEmail=/^[A-Za-z\d]+([A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{3}$/;
      var email=$("#email").val();
      if(email==""){
        this.email_valid=false;
        $("#email-info").hide();
      }
      else if(isEmail.test(String(email).toLowerCase())){
        //send user{username:"?",email:"email.value",password:"?",_id:"",...}
        //  to back end, check if email exists.
        this.userToCheckEmail.email=this.usertoSend.email;
        this.userService.checkEmail(this.userToCheckEmail)
        .subscribe(data =>
        {
          //email exists
          if(data=='false'){
            $("#email-info").text("Email already exists.");
            this.email_id=2;
          }
          else{
            $("#email-info").hide();
            this.email_valid=true;
          }
        }); 
      }
      else{
        this.email_valid=false;
        $("#email-info").text("Please enter a valid email");
        this.email_id=2;
      }
    }
    
    else if(obj == "password"){
      this.password_valid=false;
      this.confirmPassword_valid=false;
      $("#password-info").text("");
      $("#confirmPassword-info").text("");
      
      this.password_id=0;
      this.confirmPassword_id=0;

      var isMoreThanSixChars=/^.{6,}$/;
      var password=$("#password").val();
      var confirmPassword=$("#confirmPassword").val();

      if(password==""){
        this.password_valid=false;
        $("#password-info").hide();
        if(confirmPassword == ""){
          this.confirmPassword_valid=false;
          $("#confirmPassword-info").hide();
        }
        else{
          this.confirmPassword_valid=false;
          $("#confirmPassword-info").text("Must match with password");
          this.confirmPassword_id=1;
          $("#confirmPassword-info").show();
        }
      }
      else if(isMoreThanSixChars.test(String(password).toLowerCase())){
        this.password_valid=true;
        $("#password-info").hide();
        if(confirmPassword == ""){
          this.confirmPassword_valid=false;
          $("#confirmPassword-info").hide();
        }
        else if(confirmPassword === $("#password").val()){
          this.confirmPassword_valid=true;
          $("#confirmPassword-info").hide();
        }
        else{
          this.confirmPassword_valid=false;
          $("#confirmPassword-info").text("Must match with password");
          this.confirmPassword_id=1;
          $("#confirmPassword-info").show();
         }
      }
      else{
        this.password_valid=false;
        $("#password-info").text("Please enter a valid password");
        this.password_id=2;
        this.confirmPassword_valid=false;
        $("#confirmPassword-info").hide();
       }
    }

    else if(obj == "agree"){
      if(!$('#agree').is(':checked')){
        $("#agree-info").text("Please agree to the privacy policy.");
        this.agree_id=1;
        $("#agree-info").css({
          "left":$("#agree").offset().left - 1.5*$("#agree").width(),
          "top":$("#agree").offset().top - 4.5*$("#agree").height(),
          "display":"inline","text-align":"center",});
        $("#agree-info").show();
      }
    }
    else{
      console.log("Wrong input param in signup.component function blurEvents(obj: string).");
    }
  }

  //check if all input element are empty 
  //in case of no blur function are called
  private checkEmpty(){
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    if(username==""){
      $("#username").css({
        "border-style":"solid",
        "border-color":"rgb(255, 102, 102)",});
    }
    if(email==""){
      $("#email").css({
        "border-style":"solid",
        "border-color":"rgb(255, 102, 102)",});
    }
    if(password==""){
      $("#password").css({
        "border-style":"solid",
        "border-color":"rgb(255, 102, 102)",});
    }
    if(confirmPassword==""){
      $("#confirmPassword").css({
        "border-style":"solid",
        "border-color":"rgb(255, 102, 102)",});
    }
  }

  //--->if continue, add code here
}