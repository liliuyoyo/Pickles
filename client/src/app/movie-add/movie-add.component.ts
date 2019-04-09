import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { generate } from 'rxjs';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  imgPath :string ="../../../assets/images/placeholder.png";
  newMovie: Movie = new Movie("","","","","../../../assets/images/placeholder.png",0,[],[],[],"",0,0,0,0,[]);;
  actors = "";
  directors = "";
  geners = [
    { 
      value: "action",
      checked: false,
      label: "Action"
    },
    { 
      value: "romance",
      checked: false,
      label: "Romance"
    },
    { 
      value: "sci-fi",
      checked: false,
      label: "Sci-fi"
    },
    { 
      value: "crime",
      checked: false,
      label: "Crime"
    },
    { 
      value: "comey",
      checked: false,
      label: "Comey"
    },
    { 
      value: "adventure",
      checked: false,
      label: "Adventure"
    },
    { 
      value: "animation",
      checked: false,
      label: "Animation"
    },
    { 
      value: "drama",
      checked: false,
      label: "Drama"
    }
    ];
  constructor() { }

  ngOnInit() {
  }

  public createNewMovie(){
    var directorsArr = this.directors.split(",");
    directorsArr.forEach(element => {
      this.newMovie.director.push(element);
    });

    var casts = this.actors.split(",");
    casts.forEach(element => {
      this.newMovie.actors.push(element);
    });
    
    this.geners.forEach(element => {
      if(element.checked){
        this.newMovie.geners.push(element.value);
      }
    });
  
    console.log(this.newMovie);
  }

  public resetMovieData(){
    this.imgPath = "../../../assets/images/placeholder.png";
    this.newMovie = new Movie("","","","","../../../assets/images/placeholder.png",0,[],[],[],"",0,0,0,0,[]);;
    this.actors = "";
    this.directors = "";
    this.geners = [
    { 
      value: "action",
      checked: false,
      label: "Action"
    },
    { 
      value: "romance",
      checked: false,
      label: "Romance"
    },
    { 
      value: "sci-fi",
      checked: false,
      label: "Sci-fi"
    },
    { 
      value: "crime",
      checked: false,
      label: "Crime"
    },
    { 
      value: "comey",
      checked: false,
      label: "Comey"
    },
    { 
      value: "adventure",
      checked: false,
      label: "Adventure"
    },
    { 
      value: "animation",
      checked: false,
      label: "Animation"
    },
    { 
      value: "drama",
      checked: false,
      label: "Drama"
    }
    ];
  }
}
