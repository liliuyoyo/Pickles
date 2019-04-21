import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   this.listener();
  }
  public listener(){
    $(".member").mouseenter(function(){
      $(this).find("span").hide();
    });
    $(".member").mouseleave(function(){
      $(this).find("span").show();
    });
  }
}
