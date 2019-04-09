import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  imagePath:string = "";
  
  @Input() movie:Movie;
  @Output() imageUploadEvent: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.imagePath = this.movie.imagePath;
  }

  public uploadImage(){
    this.movie.imagePath = this.imagePath;
    this.imageUploadEvent.emit(this.movie);
    this.bsModalRef.hide();
  }
}
