import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchString:string;

  constructor(private moviesService : MoviesService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.moviesService.searchEvent.emit(this.searchString);
    this.router.navigateByUrl('/movies');  
  }
}
