import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../shared/models/user';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: User
  unsubscribe$ = new Subject();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser$.subscribe(( user ) => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  havePhoto() {
    return false;
  }

}
