import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchString:string;
  user:User;

  constructor(private moviesService : MoviesService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }


  public onSubmit(){
    this.moviesService.searchEvent.emit(this.searchString);
    this.searchString="";
    this.router.navigateByUrl('/movies');  
  }

  public isLoggedin(){
    // get username from server
    this.userService.getLoginedUser(this.userService.getToken())
    .subscribe((res)=>{
        if(res['status']=="true"){
          this.user._id = res['id'];
          this.user.username = res['name'];
          this.user.email = res['email'];
          this.user.image = res['image'];
          this.user.isUser = res['isuser'];
          this.user.wishList = res['list'];
          return true;
        }else{
          return false;
        }
    });
  }

  public logout(): void{
    this.userService.userLogout();
  }
}
