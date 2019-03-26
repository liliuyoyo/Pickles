import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  serverUrl: string = "http://localhost:4600/";
  
  constructor(private http: HttpClient){};

  public getTotalNum():Observable<number>{
    return this.http.get<number>(this.serverUrl+"movies/count");
  }

}
