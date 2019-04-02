import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  countDown;
  countInSec = 6;
  constructor(private router:Router) {}

  ngOnInit() {  
    this.countDown = timer(0,1000).pipe(
      take(this.countInSec),
      map(()=> --this.countInSec)
   );
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000); 
  }
}
