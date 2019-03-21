import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  @Output() onFilter = new EventEmitter<any>();

  private filterValues = {
    year: 'all',
    genres: 'all',
    area: 'all'
  }
  
  constructor() { }

  ngOnInit() {
  }

  filterBy(){
    // console.log(this.filterValues.year);
    // console.log(this.filterValues.genres);
    // console.log(this.filterValues.area);
    this.onFilter.emit(this.filterValues);
  }
}
