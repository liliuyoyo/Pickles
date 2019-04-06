import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css'],
  providers: [BsModalService]
})
export class LoginPopupComponent implements OnInit, AfterViewInit {
  
  user:User = new User("","","","","",true,[]);;

  constructor(public bsModalRef: BsModalRef,
              private userService:UserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //focus on username input after loading page every time
    //下面是临时注释：
    //此事件为每次 load 页面时生效，
    //需要加入 focus() 才可以生效，
    $('#username').trigger("focus");
  }

  public getUserLogin(){
    // get logined user
    this.userService.userLogin(this.user)
    .subscribe((data)=>{
      if(data !== 'false'){
        this.userService.saveToken(data.token);
        this.userService.saveUsername(this.user.username);
        this.bsModalRef.hide();
      }else{
        // wrong user;
        
      }
      
    });

  }

}
