import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
// import { Movie } from 'src/app//models/movie.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  curUser: User=new User("","","","","",true,[]);
  wishList: any;
  token: string;

  constructor(private userService : UserService,

    ) { }

  ngOnInit() {
    //open user info and wish list
    $('#btn-wish-list').trigger("click");
    $('#btn-user-info').trigger("click");
    $('#btn-history').trigger("click");

    //send token to back end and get info of user
    this.token = window.sessionStorage.getItem('mean-token');  
    this.userService.getLoginedUser(this.token)
      .subscribe(data =>
      {
        console.log(data);
        this.curUser.username=data['name'];
        this.curUser.email=data['email'];
        this.curUser.image=data['image'];
        this.wishList=data['list'];
      }); 
  }

  //add new function here
}
