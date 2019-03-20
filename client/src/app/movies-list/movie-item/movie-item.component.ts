import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movie:Movie;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  getMoiveDetail(){
    this.router.navigateByUrl('/movies/'+ this.movie._id);
  }

}
