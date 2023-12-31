import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private _http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    this._http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('login is susccessfull');
          this.loginForm.reset();
          this.router.navigate(['restaurant']);
          console.log(res);
        } else {
          alert('User Not Found');
        }
      },
      (err) => {
        alert('Something went wrong in , Server Side');
      }
    );
  }
}
