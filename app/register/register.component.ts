import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private sa:AuthService, 
    private route :Router,
    private fs:AngularFirestore
  ){}

  ngOnInit(): void {
  }

  register(f: any){
    let data = f.value;
    this.sa.signUp(data.email, data.password)
      .then((user) => {
        localStorage.setItem("userConnect", user.user?.uid ?? '');
        this.fs.collection("users").doc(user.user?.uid ?? '').set({
          flName: data.flName,
          email: data.email,
          bio: data.bio,
          uid: user.user?.uid ?? '',
        })
        .then(() => {
          this.route.navigate(['/login'])
        })
      })
      .catch(() => {
        console.log("error !")
      });
  }
}
