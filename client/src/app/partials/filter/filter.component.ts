import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  
  @Output() onFilter = new EventEmitter<Object>();
  @Input() searchConditions = {
    str:"",
    year:"*",
    genres:"*",
    area:"*"
  };
  
  constructor(private movieService:MoviesService) { }

  ngOnInit() {
    this.searchConditions = this.movieService.getConditions();
  }

  filterBy(){
    this.onFilter.emit(this.searchConditions);
  }
}
