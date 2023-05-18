import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageError: string = '';
  constructor(private sa:AuthService,private route:Router) { }

  ngOnInit(): void {}

  login(f: any) {
    let data = f.value;
  
    if (data.email === 'admin@example.com' && data.password === 'adminpassword') {
      // Admin credentials matched, navigate to cardform
      this.sa.signIn(data.email, data.password)
        .then((user) => {
          localStorage.setItem("userConnect", user.user?.uid ?? '');
          this.route.navigate(['/espace-admin']);
        })
        .catch(() => {
          this.messageError = "Incorrect email and password";
        });
    } else {
      // Regular user, navigate to home
      this.sa.signIn(data.email, data.password)
        .then((user) => {
          localStorage.setItem("userConnect", user.user?.uid ?? '');
          this.route.navigate(['/home']);
        })
        .catch(() => {
          this.messageError = "Incorrect email and password";
        });
    }
  }
}  