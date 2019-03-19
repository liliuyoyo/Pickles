import { Component, OnInit } from '@angular/core';

import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  moviesList: Movie[] = [new Movie("Harry Potter","Love this movie...","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSDXEJwBLV-yzjNOFHMoJ-OqSyFtjjqweTkvby3rePZYOzudM",2008,"aaa",["bbb","ccc"],"fantsy","UK",120,10), 
                         new Movie("Harry Potter1","Love this movie too...","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCFC_uuZY7jIT7EecrWAvYYpsFIubVyznbtju4ve50o_AYenZ",2010,"aaa",["bbb","ccc"],"fantsy","UK",120,10)];

  constructor() { }

  ngOnInit() {
  }

}
