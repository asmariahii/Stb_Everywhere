import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private sa: AuthService,
    private route: Router,
    private fs: AngularFirestore
  ) { }

  ngOnInit(): void {
  }

  generateRandomRib(): string {
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `1000403451419027${randomDigits}`;
  }

  register(f: NgForm) {
    let data = f.value;
    this.sa.signUp(data.email, data.password)
      .then((user) => {
        localStorage.setItem("userConnect", user.user?.uid ?? '');
        const rib = this.generateRandomRib(); // Générez le numéro de RIB

        this.fs.collection("users").doc(user.user?.uid ?? '').set({
          flName: data.flName,
          email: data.email,
          telephone: data.telephone,
          accountType: data.accountType, // Ajoutez le champ accountType
          image: 'https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-ic%C3%B4ne-de-visage-anonyme-de-profil-personne-silhouette-grise-avatar-par-d%C3%A9faut-masculin-photo.jpg',
          demande: '',
          rib: rib, // Utilisez la variable rib générée
          cin: data.cin,
          region: data.region,


          uid: user.user?.uid ?? '',
          isActive: false // Définir le compte comme désactivé


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
