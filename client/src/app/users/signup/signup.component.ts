import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  email:string;
  username:string;
  password:string;
  usertoSend:User={_id:"",username: "", email: "",password: "",image: ""};
  usersList: User[];
  userBack:User;
  private subscription : Subscription;

  constructor(private userService : UserService,
    private router: Router,
    private elementRef:ElementRef)
  { }

  ngOnInit() {
    this.userService.getAllUsers()
    .subscribe(data =>
    {
      this. usersList = data;
    }); 
  }
  
  signup() {
    this.usertoSend.email=this.email;
    this.usertoSend.username=this.username;
    this.usertoSend.password=this.password;
    this.userService.sendToBackend(this.usertoSend)
    .subscribe(data =>
    {
      console.info(JSON.stringify(data));
    }); 
  }

  //username
  usernameFocus(){
    var d1 = this.elementRef.nativeElement.querySelector('.usernameMsg');
    d1.remove();
  }
  usernameBlur(){
    var d1 = this.elementRef.nativeElement.querySelector('.username');
    var isAlphanumeric=/^[A-Za-z0-9]+$/; 
		if(this.username==""||this.username==undefined){
      d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">*</div>');
		}
    else if(isAlphanumeric.test(this.username)){
      d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">OK</div>');
    }
    else{
      d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">The username field must contain only alphabetical or numeric characters.</div>');
    }
  }

  //Email
  emailFocus(){
    var d2 = this.elementRef.nativeElement.querySelector('.emailMsg');
    d2.remove();
  }
  emailBlur(){
    var d2 = this.elementRef.nativeElement.querySelector('.email');
    var isEmail=/^[A-Za-z\d]+([A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{3}$/; 
		if(this.email==""||this.email==undefined){
      d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">*</div>');
		}
    else if(isEmail.test(this.username)){
      d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">OK</div>');
    }
    else{
      d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">The email field should be a valid email address (abc@def.xyz). Everything is alphanumeric, except “@”. There can be any number of characters before and after “@” and there will be three characters after dot.</div>');
    }
  }

  //password
  passwordFocus(){
    var d3 = this.elementRef.nativeElement.querySelector('.passwordMsg');
    d3.remove();
  }
  passwordBlur(){
    var d3 = this.elementRef.nativeElement.querySelector('.password');
    var isMoreThanSixChars=/^.{6,}$/; 
		if(this.password==""||this.password==undefined){
      d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">*</div>');
		}
    else if(isMoreThanSixChars.test(this.username)){
      d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">OK</div>');
    }
    else{
      d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">The password field should be at least six characters long.</div>');
    }
  }

}



