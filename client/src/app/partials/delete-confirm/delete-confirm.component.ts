import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css'],
  providers: [BsModalService]
})
export class DeleteConfirmComponent implements OnInit {
  @Output() deleteEvent = new EventEmitter<string>();
  @Input() title: string = "";
  @Input() imgPath:string ="";

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    
  }

  public deleteConfirm(){
    this.deleteEvent.emit("true");
    this.bsModalRef.hide();
  }
}
