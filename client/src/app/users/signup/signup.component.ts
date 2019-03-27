import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User,signupUser } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

// 1. 引入forms中的组件
import {FormGroup, FormControl} from '@angular/forms';
// 2. 引入ng2-validation中的组件
import {CustomValidators} from 'ng2-validation';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  usertoSend:signupUser={email:"",username:"",password:""};
  usersList: User[];
  userBack:signupUser={email:"",username:"",password:""};
  private subscription : Subscription;
  form:FormGroup;
  constructor(private userService : UserService,
    private router: Router,
    private elementRef:ElementRef)
  { 
    this.form = new FormGroup({
      username: new FormControl('', CustomValidators.range([5, 9])),
      email: new FormControl('', CustomValidators.number),
      password: new FormControl('', CustomValidators.number),
    });
  }

  ngOnInit() {
    this.userService.getAllUsers()
    .subscribe(data =>
    {
      this. usersList = data;
    }); 
  }
  
  signup() {
    this.usertoSend.email= this.form.get('email').value;
    this.usertoSend.username=this.form.get('username').value;
    this.usertoSend.password=this.form.get('password').value;
    console.log(this.form);
    this.userService.sendToBackend(this.usertoSend)
    .subscribe(data =>
    {
      console.log(data);
      // this.userBack = data;
    }); 
  }

//   //username
//   usernameFocus(){
//     var d1 = this.elementRef.nativeElement.querySelector('.usernameMsg');
//     d1.remove();
//   }
//   usernameBlur(){
//     var d1 = this.elementRef.nativeElement.querySelector('.username');
//     var isAlphanumeric=/^[A-Za-z0-9]+$/; 
// 		if(this.username==""||this.username==undefined){
//       d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">*</div>');
// 		}
//     else if(isAlphanumeric.test(this.username)){
//       d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">OK</div>');
//     }
//     else{
//       d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">The username field must contain only alphabetical or numeric characters.</div>');
//     }
//   }

//   //Email
//   emailFocus(){
//     var d2 = this.elementRef.nativeElement.querySelector('.emailMsg');
//     d2.remove();
//   }
//   emailBlur(){
//     var d2 = this.elementRef.nativeElement.querySelector('.email');
//     var isEmail=/^[A-Za-z\d]+([A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{3}$/; 
// 		if(this.email==""||this.email==undefined){
//       d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">*</div>');
// 		}
//     else if(isEmail.test(this.username)){
//       d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">OK</div>');
//     }
//     else{
//       d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">The email field should be a valid email address (abc@def.xyz). Everything is alphanumeric, except “@”. There can be any number of characters before and after “@” and there will be three characters after dot.</div>');
//     }
//   }

//   //password
//   passwordFocus(){
//     var d3 = this.elementRef.nativeElement.querySelector('.passwordMsg');
//     d3.remove();
//   }
//   passwordBlur(){
//     var d3 = this.elementRef.nativeElement.querySelector('.password');
//     var isMoreThanSixChars=/^.{6,}$/; 
// 		if(this.password==""||this.password==undefined){
//       d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">*</div>');
// 		}
//     else if(isMoreThanSixChars.test(this.username)){
//       d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">OK</div>');
//     }
//     else{
//       d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">The password field should be at least six characters long.</div>');
//     }
//   }

// }
  // 3. 定义表单组
  

    //username
  usernameFocus(){
    // var d1 = this.elementRef.nativeElement.querySelector('.usernameMsg');
    // d1.remove();
  }
  usernameBlur(){
    // var d1 = this.elementRef.nativeElement.querySelector('.username');
    // var isAlphanumeric=/^[A-Za-z0-9]+$/; 
		// if(this.username==""||this.username==undefined){
    //   d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">*</div>');
		// }
    // else if(isAlphanumeric.test(this.username)){
    //   d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">OK</div>');
    // }
    // else{
    //   d1.insertAdjacentHTML('beforeend', '<div class="usernameMsg">The username field must contain only alphabetical or numeric characters.</div>');
    // }
  }

  //Email
  emailFocus(){
    // var d2 = this.elementRef.nativeElement.querySelector('.emailMsg');
    // d2.remove();
  }
  emailBlur(){
    // var d2 = this.elementRef.nativeElement.querySelector('.email');
    // var isEmail=/^[A-Za-z\d]+([A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{3}$/; 
		// if(this.email==""||this.email==undefined){
    //   d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">*</div>');
		// }
    // else if(isEmail.test(this.username)){
    //   d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">OK</div>');
    // }
    // else{
    //   d2.insertAdjacentHTML('beforeend', '<div class="emailMsg">The email field should be a valid email address (abc@def.xyz). Everything is alphanumeric, except “@”. There can be any number of characters before and after “@” and there will be three characters after dot.</div>');
    // }
  }

  //password
  passwordFocus(){
    // var d3 = this.elementRef.nativeElement.querySelector('.passwordMsg');
    // d3.remove();
  }
  passwordBlur(){
    // var d3 = this.elementRef.nativeElement.querySelector('.password');
    // var isMoreThanSixChars=/^.{6,}$/; 
		// if(this.password==""||this.password==undefined){
    //   d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">*</div>');
		// }
    // else if(isMoreThanSixChars.test(this.username)){
    //   d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">OK</div>');
    // }
    // else{
    //   d3.insertAdjacentHTML('beforeend', '<div class="passwordMsg">The password field should be at least six characters long.</div>');
    // }
  }
}