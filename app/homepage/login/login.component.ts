import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';

interface User {
  nom: string;
  email: string;
  accountType: string;
  uid: string;
  flName: string;
  rib: string;
  isActive: boolean; // Nouveau champ pour indiquer l'état du compte
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageError: string = '';
  accountActivated: boolean = false;


  constructor(
    private sa: AuthService,
    private route: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  sendPasswordResetEmail(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  resetPassword() {
    const email = ''; // Récupérer l'e-mail à partir du formulaire

    if (email) {
      this.sendPasswordResetEmail(email)
        .then(() => {
          // Email de réinitialisation du mot de passe envoyé avec succès
          // Fournir un feedback à l'utilisateur, par exemple, afficher un message de succès
          console.log('Email de réinitialisation du mot de passe envoyé avec succès');
        })
        .catch((error) => {
          // Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation du mot de passe
          // Gérer l'erreur, par exemple, afficher un message d'erreur
          console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation du mot de passe :', error);
        });
    }
  }

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
     
      this.sa.signIn(data.email, data.password)
      .then((user) => {
        localStorage.setItem("userConnect", user.user?.uid ?? '');
    
        // Check if the user email exists in Firestore
        this.firestore.collection('users').doc(user.user?.uid).get()
          .toPromise()
          .then((doc) => {
            if (doc && doc.exists) {
              const userData = doc.data() as User; // Assurez-vous d'utiliser le bon type pour userData
    
              if (userData && userData.email === data.email) {
                // Check if the account is activated
                if (userData.isActive) {
                  this.accountActivated = true;
                  this.route.navigate(['/home']);
                } else {
                  this.accountActivated = false;
                  this.messageError = "Votre compte est en cours d'activation. Veuillez patienter.";
                }
              }
            }
          })
          .catch((error) => {
            console.error('Error checking Firestore collection:', error);
          });
      })
      .catch(() => {
        this.messageError = "Email et mot de passe incorrects";
      });
    }
  }

}
