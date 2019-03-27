import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  
  @Output() pageChangedEvent:EventEmitter<any> = new EventEmitter<any>();

  private pager = {
    currentPage: 1,
    totalPages:1,
    pages: [1],
    pageLimit: 8
  };

  constructor(private pgService: PaginationService) {}

  ngOnInit() {
    this.pgService.getTotalNum()
    .subscribe((total)=>{
      this.pager.totalPages = Math.round(total / this.pager.pageLimit);
      for(var i = 2; i <= this.pager.totalPages; i++){
        this.pager.pages.push(i);
      }
    });
  }

  public setPage(pageNum:number){
    if(pageNum !== this.pager.currentPage){
      this.pager.currentPage = pageNum;
      this.pageChangedEvent.emit(this.pager);
    }
  }
}
