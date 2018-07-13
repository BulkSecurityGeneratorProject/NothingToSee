import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from '../shared/models/user';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  state;
  subscriptions: Subscription = new Subscription();
  user: User;
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.state = this.parseUrl(this.router.url);
    this.subscriptions.add(this.router.events.subscribe((event) =>{
      if ( event instanceof NavigationEnd ) {
        this.state = this.parseUrl(event.urlAfterRedirects);
      }
    }))
    this.subscriptions.add(this.userService.currentUser$.subscribe(( user ) => {
      this.user = user;
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  parseUrl( fullUrl ) {
    if ( !fullUrl ) {
      return '';
    }
    return fullUrl.replace('/', '').split('/')[0].split('?')[0]
  }

  navigate() {
    this.router.navigate(['/' + this.state ])
  }
}
