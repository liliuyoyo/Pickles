import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { UserService } from '../services/user.service';
import { MoviesService } from '../services/movies.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UploadImageComponent } from '../partials/upload-image/upload-image.component';


@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  defaultImgPath = "https://imgplaceholder.com/300x450/cccccc/757575/fa-file-photo-o?font-size=130";
  newMovie: Movie = new Movie("","","",this.defaultImgPath,this.defaultImgPath,0,[],[],[],"",0,0,0,0,[]);;
  actors = "";
  directors = "";
  modalRef: BsModalRef;

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
      value: "comedy",
      checked: false,
      label: "Comedy"
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
  constructor(private userService: UserService,
              private moviesService: MoviesService,
              private modalService:BsModalService,) { }

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
  
    this.userService.isLoggedIn()
    .subscribe((res)=>{
      // if user is loggedin
      if(res=="true"){
        const token = this.userService.getToken();
        const addData = {
          token : token,
          movie: this.newMovie
        }

        // update movie data by pass the new value to server
        this.moviesService.createMovie(addData)
        .subscribe((updatedRes)=>{
          // check the server response
          if(updatedRes['status'] == "true"){
            //get updated movie value 
            console.log("Successfully added movie");
            this.resetMovieData();
          }else{
            console.log("Fail to update.");
          }
        });
      }else{
        // if user is not loggedin , show popup login page
        console.log("loggin expired.")
      }
    });  
  }

  public uploadImages(){
    const initialState={
      movie: this.newMovie
    }
    this.modalRef = this.modalService.show(UploadImageComponent,{initialState});
    this.modalRef.content.imageUploadEvent
    .subscribe((updated)=>{
      this.newMovie.smallImagePath = updated.smallImagePath;
      this.newMovie.imagePath = updated.imagePath;
    });
  }


  public resetMovieData(){
    this.newMovie = new Movie("","","",this.defaultImgPath,this.defaultImgPath,0,[],[],[],"",0,0,0,0,[]);;
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
      value: "comedy",
      checked: false,
      label: "Comedy"
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
