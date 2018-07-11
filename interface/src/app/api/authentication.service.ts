import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from '../shared/models/loggedUser';
 
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    logged$: BehaviorSubject<LoggedUser> = new BehaviorSubject( null );
    constructor(private http: HttpClient) {}

    createLoggedUser( name, token ) {
        const loggedUser = new LoggedUser( name, token );
       
        localStorage.setItem('currentUser', JSON.stringify( loggedUser ));
        this.logged$.next( loggedUser );
        return loggedUser;
    }
    login(userForm) {
        return this.http.post<any>('/api/authenticate', { username: userForm.username, password: userForm.password })
            .pipe(map(( response ) => {
                if ( response.id_token ) {
                    return this.createLoggedUser( userForm.username, response.id_token );
                }
            }));
            
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.logged$.next( null );
    }
}