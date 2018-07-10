import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constraints } from './constraints';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from '../shared/models/loggedUser';
 
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    logged$: BehaviorSubject<LoggedUser> = new BehaviorSubject( null );
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<any>(Constraints.BASE_URL + '/authenticate', { username: username, password: password })
            .pipe(map(( res:any ) => {
                if (res && res.token) {
                    let loggedUser = new LoggedUser( res.token, username );
                    this.logged$.next( loggedUser );
                    localStorage.setItem('currentUser', JSON.stringify( loggedUser ));
                }
            }));
    }
    logout() {
        localStorage.removeItem('currentUser');
    }
}