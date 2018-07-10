import { Component } from '@angular/core';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from './shared/models/user';
import { Subject } from 'rxjs';
import { UserService } from './user/user.service';
import { AuthenticationService } from './api/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  hasUser: number = -1;
  constructor( private userService: UserService, private authService: AuthenticationService) {}
  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if ( currentUser ) {
      this.authService.createLoggedUser( currentUser.username, currentUser.token );
    } 
    this.userService.currentUser$.subscribe(( user ) => {
      if ( user ) {
        this.hasUser = 1;
      } else {
        this.hasUser = 0;
      }
    })
  }
}
