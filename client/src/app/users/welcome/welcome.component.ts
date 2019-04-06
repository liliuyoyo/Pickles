import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { DataToSend } from 'src/app/models/data-to-send.model';
import { DataService} from 'src/app/services/data.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  countDown:any;
  countInSec = 6;
  timer: any;
  data: DataToSend = new DataToSend("");

  constructor(private router:Router,
    private dataService : DataService,
    ) {}

  ngOnInit() {  
    this.data = this.dataService.dataToSend;
    this.countDown = timer(0,1000).pipe(
      take(this.countInSec),
      map(()=> --this.countInSec)
    );
    this.timer=setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000); 
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
