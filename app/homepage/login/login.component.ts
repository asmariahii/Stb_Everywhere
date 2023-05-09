import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router){}


  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);

    this.httpClient
      .get(
        'https://stb-c54bc-default-rtdb.firebaseio.com/users.json',
        {
          params: new HttpParams()
            .set('orderBy', '"email"')
            .set('equalTo', `"${loginForm.value.email}"`),
        }
      )
      .subscribe((users) => {
        console.log(users);

        // Check if user with entered email exists in database
        if (Object.keys(users).length === 1) {
          const user = Object.values(users)[0];
          if (user.password === loginForm.value.password) {
            console.log('Login successful');

            // Redirect to home page
            this.router.navigate(['home']);
          } else {
            console.log('Incorrect password');
          }
        } else {
          console.log('User not found');
        }
      });
  }
}
