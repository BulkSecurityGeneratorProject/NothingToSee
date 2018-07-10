import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { User } from '../shared/models/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthenticationService } from '../api/authentication.service';
import { LoggedUser } from '../shared/models/loggedUser';
 
@Injectable({ providedIn: 'root' })
export class UserService implements OnInit, OnDestroy {
    currentUser$: BehaviorSubject<User> = new BehaviorSubject( null );
    unsubscribe$ = new Subject();
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}
    
    ngOnInit() {
        this.authenticationService.logged$.subscribe(( loggedUser: LoggedUser ) => {
            this.getUser( loggedUser.userName );
        })
    }
    
    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getUser( userName ) {
        return this.http.get<User>('/api/user', { params: { userName: userName }});
    }

    setCurrentUser( user, ) {
        localStorage.currentUser = user;
    }
}