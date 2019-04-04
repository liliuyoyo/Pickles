import { Component, OnInit,TemplateRef  } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  user : User = new User("","","","","",true,[]);
  isAdmin: boolean = false;
  tokenResponse: string;

  //for switch the class of prompt spans
  username_id:number;
  password_id:number;

  constructor(private userService: UserService,
              private location: Location,
              private modalService: NgbModal){}
  
  ngOnInit(){
    // $('#username').focus();
    this.listeners(this);
  }
  @ViewChild('content') private content:TemplateRef <any>;
  
  public onSubmit(){
    // get logined user
    this.userService.userLogin(this.user)
    .subscribe((data)=>{
      if(data !== 'false'){
        this.tokenResponse = data.token;
        this.userService.saveToken(this.tokenResponse);
        this.isAdmin = data.isuser;
        this.location.back();
      }else{
        // wrong user;
        this.modalService.open(this.content, { size: 'sm' });
      }
      
    });
  }




  
  listeners(login:any){
    //hide the prompt spans firstly
    $("span").hide();

    //********Username Events********

    //focus
    $("#username").focus(function(){
      $("#username-info").hide();
    });

    //blur
    $("#username").blur(function(){
      $("#username-info").text("");
      login.username_id=0;
      var username=$("#username").val();
      if(username==""){
        login.username_id=1;
        $("#username-info").text("Username can't be empty.");
        $("#username-info").show();
      }
    }); 
    
    //********Password Events********
    
    //focus
    $("#password").focus(function(){
      $("#password-info").hide();
    });
    
    //blur
    $("#password").blur(function(){
      $("#password-info").text("");
      login.password_id=0;
      var password=$("#password").val();
      if(password==""){
        login.password_id=1;
        $("#password-info").text("Password can't be empty.");
        $("#password-info").show();
      }
    });
  }

}

