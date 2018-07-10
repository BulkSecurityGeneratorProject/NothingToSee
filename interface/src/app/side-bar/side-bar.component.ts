import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { OnDestroy, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from '../shared/models/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  state;
  unsubscribe$ = new Subject();
  user: User;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.state = this.parseUrl(this.router.url);
    this.router.events.subscribe((event) =>{
      if ( event instanceof NavigationEnd ) {
        this.state = this.parseUrl(event.urlAfterRedirects);
      }
    })
    this.userService.currentUser$.subscribe(( user ) => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
