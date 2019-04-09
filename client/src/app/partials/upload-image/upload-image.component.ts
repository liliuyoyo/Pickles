import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Input() movie:Movie;

  constructor() { }

  ngOnInit() {
    
  }

}
