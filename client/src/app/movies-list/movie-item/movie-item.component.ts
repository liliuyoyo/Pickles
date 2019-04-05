import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from 'src/app/models/movie.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  
  @Input() movie:Movie;
  @Input() isAdmin:boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  // direct to the movie-detail page
  getMoiveDetail(){
    this.router.navigateByUrl('/movies/'+ this.movie._id);
  }

  // direct to the movie-edit page
  onEditMovie(){
    this.router.navigateByUrl('/moives/edit/'+this.movie._id);
  }

  onDeleteMovie(){
    
  }

}
