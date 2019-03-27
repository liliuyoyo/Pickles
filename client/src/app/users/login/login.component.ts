import { Component, OnInit } from '@angular/core';
import { UserService, TokenResponse } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User("","","","","",true);
  tokenResponse: string;

  constructor(private userService: UserService) {}
  
  ngOnInit(){}

  onSubmit(){
    // get logined user
    this.userService.getLoginedUser(this.user)
    .subscribe((data)=>{
      if(data[0] == 1){
        this.tokenResponse = data[1];
        this.userService.saveToken(this.tokenResponse);
      }else{
        console.log(data[1]);
      }
      
    });
  }
}
