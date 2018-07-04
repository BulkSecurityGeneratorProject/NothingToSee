import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  state;
  unsubscribe$ = new Subject();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) =>{
      if ( event instanceof NavigationEnd ) {
        this.state = event.url.replace('/', '').split('/')[0].split('?')[0];
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  navigate() {
    this.router.navigate(['/' + this.state ])
  }

  // let params = { queryParams: { 
    //       executionDiaryId: this.planning.executionDiaryId, 
    //       at: this.planning.at, 
    //       cnl: this.planning.cnl }
    //     }
    //     this.router.navigate(['/planning'], params)
}
