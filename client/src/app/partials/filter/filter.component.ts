import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  @Output() onFilter = new EventEmitter<Object>();

  private filterValues = {
    year: '*',
    genres: '*',
    area: '*'
  }
  
  constructor() { }

  ngOnInit() {
  }

  filterBy(){
    this.onFilter.emit(this.filterValues);
  }
}
