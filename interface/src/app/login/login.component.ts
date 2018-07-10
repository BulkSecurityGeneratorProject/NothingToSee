import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../api/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
    login: FormGroup;
    returnUrl: string;
    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {}
    ngAfterViewInit() {
        let user = this.userService.currentUser$.getValue();
        if ( user ) {
            this.router.navigate([this.returnUrl]);
        }
    }
    ngOnInit() {
        this.initializeForms();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    initializeForms() {
        this.login = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    doLogin() {
        if ( this.login.valid ) {
            this.authService.login(this.login.getRawValue()).subscribe(( done ) => {
                if ( done ) {
                    this.router.navigate([this.returnUrl]);
                }
            });
        }
    }
}
