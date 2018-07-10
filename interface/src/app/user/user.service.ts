import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { User } from '../shared/models/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthenticationService } from '../api/authentication.service';
import { LoggedUser } from '../shared/models/loggedUser';
 
@Injectable({ providedIn: 'root' })
export class UserService {
    currentUser$: BehaviorSubject<User> = new BehaviorSubject( null );
    unsubscribe$ = new Subject();
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.initializeUser();
    }

    initializeUser() {
        this.authenticationService.logged$.subscribe(( loggedUser: LoggedUser ) => {
            if ( loggedUser ) {
                this.getUser( loggedUser.username ).subscribe( this.currentUser$ );
            }
        })
    }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getUser( userName ) {
        return this.http.get<User>('/api/users/' + userName);
    }

    setCurrentUser( user, ) {
        localStorage.currentUser = user;
    }
}