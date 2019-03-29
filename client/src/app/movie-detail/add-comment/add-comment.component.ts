import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
  providers: [BsModalService]
})
export class AddCommentComponent implements OnInit {
  @Output() addCommentEvent = new EventEmitter<string>();
  commentText : string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  public addNewComment() {
    this.addCommentEvent.emit(this.commentText);
    this.bsModalRef.hide();
	}

}
