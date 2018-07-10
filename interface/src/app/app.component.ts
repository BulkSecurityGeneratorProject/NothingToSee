import { Component } from '@angular/core';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from './shared/models/user';
import { Subject } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: User;
  constructor( private userService: UserService ) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe(( user ) => {
      this.user = user;
    })
  }
}
