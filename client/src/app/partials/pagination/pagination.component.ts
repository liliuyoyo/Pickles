import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
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
      this.pager.totalPages = total / this.pager.pageLimit;
    });
  }

  public setPage(pageNum:number){
    this.pager.currentPage = pageNum;
  }

}
