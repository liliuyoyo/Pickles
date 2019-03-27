import { Component, OnInit } from '@angular/core';
import { UserService, TokenResponse } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User;
  tokenResponse: TokenResponse;

  constructor(private userService: UserService) {}
  
  ngOnInit(){}

  onSubmit(){
    // get logined user
    this.userService.getLoginedUser(this.user)
    .subscribe((data)=>{
      this.tokenResponse = data;
      console.log(this.tokenResponse);
    });
  }
}
