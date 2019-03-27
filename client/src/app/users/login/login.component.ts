import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  user : User;

  constructor(private userService: UserService) {}
  
  ngOnInit(){}

  onSubmit(){
    // get logined user
    this.userService.getLoginedUser(this.username,this.password)
    .subscribe((data)=>{
      this.user = data;
      console.log(this.user);
    });
  }
}
