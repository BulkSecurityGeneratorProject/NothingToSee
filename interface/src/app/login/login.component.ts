import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    login: FormGroup;
    constructor( private formBuilder: FormBuilder, ) { }
    ngOnInit() {
        this.initializeForms();
    }
    initializeForms() {
        this.login = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}
