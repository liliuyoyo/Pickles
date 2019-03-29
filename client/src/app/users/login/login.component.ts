import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User("","","","","",true);
  isAdmin: boolean = false;
  tokenResponse: string;

  constructor(private userService: UserService,
              private location: Location) {}
  
  ngOnInit(){}

  onSubmit(){
    // get logined user
    this.userService.getLoginedUser(this.user)
    .subscribe((data)=>{
      if(data !== false){
        this.tokenResponse = data.token;
        this.userService.saveToken(this.tokenResponse);
        this.isAdmin = data.isuser;
        this.location.back();
      }else{
        // wrong user;
        console.log(data[1]);
      }
      
    });
  }
}
