import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  user : User = new User("","","","","",true,[]);
  isAdmin: boolean = false;
  tokenResponse: string;

  //for switch the class of prompt spans
  username_id:number=1;
  password_id:number=1;

  //for check valiation
  username_valid: boolean=false;
  password_valid: boolean=false;

  //cur user photo and photo initial: default link
  defaultPhoto: string = "https://image.flaticon.com/icons/svg/149/149071.svg";
  curUserPhoto: string = this.defaultPhoto;

  constructor(private userService: UserService,
              private router: Router,
              private modalService: NgbModal){}
  
  ngOnInit(){
    this.listeners(this);
  }

  ngAfterViewInit() {
    //focus on username input after loading page every time
    $('#username').trigger("focus");
  }

  @ViewChild('content') private content:TemplateRef <any>;

  public onSubmit(){
    this.checkEmpty();
    if(this.username_valid == true&&
      this.password_valid == true){
      // get logined user
      this.userService.userLogin(this.user)
        .subscribe((data)=>{
          if(data !== 'false'){
            this.tokenResponse = data.token;
            this.userService.saveToken(this.tokenResponse);
            this.userService.saveUsername(this.user.username);
            this.isAdmin = data.isuser;
            this.router.navigateByUrl('/movies');  
          }else{
            // wrong user;
            this.modalService.open(this.content, { size: 'sm' });
          }
        });
    }
  }

  listeners(login:any){
    //hide the prompt spans firstly
    $("span").hide();
    //Username Events
    //focus
    $("#username").focus(function(){
      login.focusEvents("username");
    });
    //blur
    $("#username").blur(function(){
      login.blurEvents("username");
    }); 
    //Password Events
    //focus
    $("#password").focus(function(){
      login.focusEvents("password");
    });
    //blur
    $("#password").blur(function(){
      login.blurEvents("password");
    });
  }

  //********Show prompt msg when blur input element********
  private focusEvents(obj: string){
    if(obj == "username"){
      $("#username").css({"border-color":"#ccc",});
      $("#username-info").hide();
    }
    else if(obj == "password"){
      $("#password").css({"border-color":"#ccc",});
      $("#password-info").hide();
    }
    else{
      console.log("Wrong input param in login.component function focusEvents(obj: string).");
    }
  }

  //********Show prompt msg when blur input element********
  private blurEvents(obj: string){
    if(obj == "username"){
      $("#username-info").text("");
      this.username_id=0;
      this.username_valid=false;
      var username=$("#username").val();
      if(username==""){
        this.username_id=1;
        this.username_valid=false;
        $("#username-info").text("Username can't be empty.");
        $("#username-info").show();
      }
      else{
        this.username_valid=true;
        // Show user photo after input correct username
        const curUserData = {
          username : this.user.username,
        }
        this.userService.getUserPhoto(curUserData)
          .subscribe((data)=>{
            if(data["status"]=="true"){
              this.curUserPhoto=data['image'];
            }
            else{
              this.curUserPhoto=this.defaultPhoto;
            }
          });
      }
      
     
    }
    else if(obj == "password"){
      $("#password-info").text("");
      this.password_id=0;
      this.password_valid=false;
      var password=$("#password").val();
      if(password==""){
        this.password_id=1;
        this.password_valid=false;
        $("#password-info").text("Password can't be empty.");
        $("#password-info").show();
      }
      else{
        this.password_valid=true;
      }
    }
    else{
      console.log("Wrong input param in login.component function blurEvents(obj: string).");
    }
  }

  //check if all input element are empty 
  //in case of no blur function are called
  private checkEmpty(){
    var username = $("#username").val();
    var password = $("#password").val();

    if(username==""){
      $("#username").css({ "border-color":"rgb(255, 102, 102)",});
    }
    if(password==""){
      $("#password").css({"border-color":"rgb(255, 102, 102)",});
    }
  }

  onKeydownEvent(event: KeyboardEvent): void {
    if (event.keyCode === 13 && event.shiftKey) {
        this.onSubmit();
    }
 }
  //--->if continue, add code here
}

