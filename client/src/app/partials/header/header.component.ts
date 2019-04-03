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
    return this.userService.getToken() !== null;
  }

  public logout(): void{
    this.userService.userLogout();
  }
}
