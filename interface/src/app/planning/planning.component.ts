import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver, AfterContentInit, ViewContainerRef} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DynamicDirective } from '../shared/directive/dynamic.directive';
import { MassiveComponent } from '.';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild(DynamicDirective) dynamicHost: DynamicDirective;
  states: Set<any> = new Set();
  statesKeys: Array<string> = new Array();
  subscriptions: Subscription = new Subscription();
  ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  viewContainerRef: ViewContainerRef;
  isHome:boolean = false;

  constructor ( 
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private route: ActivatedRoute ) {}
  ngAfterContentInit() {
    this.ready$.next(true);
  }
  ngOnInit() { 
    this.viewContainerRef = this.dynamicHost.viewContainerRef;
    this.initializeStates();
    this.initializeRoutesStates();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  initializeStates() {
    this.states['manobraUnica'] = { 
      component: MassiveComponent, 
      name: 'Manobra única', 
      description: 'Realizar uma única manobra',
      icon: 'fa fa-cube'
    };

    this.states['manobraMassiva'] = {
      component: MassiveComponent, 
      name: 'Manobra massiva', 
      description: 'Realizar inúmeras manobras',
      icon: 'fa fa-cubes'
    };

    this.statesKeys = Object.keys(this.states)
  }
  initializeRoutesStates() {
    this.loadRoute(this.router.routerState.snapshot.url);
    this.router.events.subscribe((event) => {
      if ( event instanceof NavigationEnd ) {
        this.loadRoute( event.urlAfterRedirects );
      }
    })
  }
  setState( name ) {
    this.router.navigate([ name ], {relativeTo: this.route})
    this.loadComponent( this.states[name] )
  }
  loadComponent( state ) {
    if (!state) {
      this.router.navigate(['planning/home']);
      this.isHome = true;
      return;
    }

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(state.component);
    this.viewContainerRef.clear();
    let instance = this.viewContainerRef.createComponent(componentFactory).instance;
    instance['planningComponent'] = this;
    this.isHome = false;
  }
  loadRoute(url) {
    let urlParams = url.split('/')
    let toNavigate = urlParams[2];
    if ( toNavigate && toNavigate !== 'home' ) {
      let state = this.states[toNavigate];
      this.loadComponent(state);
    } else {
      this.isHome = true;
      this.router.navigate(['planning/home']);
      if (this.viewContainerRef) {
        this.viewContainerRef.clear();
      }
    }
  }
}