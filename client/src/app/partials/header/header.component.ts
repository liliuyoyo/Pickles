import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchString:string = "";
  searchConditions = {
    str:"",
    year:"*",
    genres:"*",
    area:"*"
  };
  username:string;

  constructor(private moviesService : MoviesService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {}

  public onSubmit(){
    this.searchConditions.str = this.searchString;
    this.searchString = "";
    this.moviesService.setConditions(this.searchConditions);
    this.moviesService.searchingMovies()
    .subscribe((data)=>{
      this.moviesService.movieListEvent.emit(data); 
    });
    this.router.navigateByUrl('/movies'); 
  }
  

  public isLoggedin(){
    this.username = this.userService.getUsername();
    return this.username == null ? false:true;
  }

  public logout(): void{
    this.userService.userLogout();
  }
}