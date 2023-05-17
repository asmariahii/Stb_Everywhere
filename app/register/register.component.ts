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
          telephone: data.telephone,
          adresse: data.adresse,
          accountType: data.accountType, // Add accountType field
          image:'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo.jpg',
          demande: '' ,
          rib: '',
  
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
