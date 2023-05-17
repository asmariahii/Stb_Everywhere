import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

interface UserProfile {
  demande: string;
}

@Component({
  selector: 'app-cheque-form',
  templateUrl: './cheque-form.component.html',
  styleUrls: ['./cheque-form.component.css']
})
export class ChequeFormComponent {
  nombreChequiersOptions = [25, 30];
  messageSent = false;
  message = '';
  nombreChequiers: number | undefined;
  demande: string | undefined;
  Uid: string | undefined;
  dataProfile: UserProfile = {
    demande: '',
  };
  demandeEnCours = false;

  constructor(
    private as: AuthService,
    private breakpointObserver: BreakpointObserver,
    private fs: AngularFirestore,
    private router: Router
  ) {
    this.as.user.subscribe((user) => {
      if (user) {
        this.Uid = user.uid;
      }
    });
  }

  ngOnInit(): void {
    this.fs.collection("users").doc<UserProfile>(localStorage.getItem("userConnect") || '').valueChanges().subscribe((data) => {
      console.log(data);
      this.dataProfile.demande = data?.demande ?? '';
      this.demandeEnCours = !!this.dataProfile.demande;
    });
  }

  onSubmit(form: NgForm) {
    // Enregistre la demande de l'utilisateur dans la base de données Firebase
    if (this.Uid) {
      this.fs.collection("users").doc<UserProfile>(this.Uid).update({ demande: '' })
        .then(() => {
          this.messageSent = true;
          this.message = `Votre demande de chéquier a été envoyée avec succès. Nous vous contacterons dès que possible pour vous informer de la suite des opérations.`;
          // Réinitialise les champs du formulaire
          this.nombreChequiers = undefined;
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement de la demande dans la base de données :", error);
          this.messageSent = true;
          this.message = `Une erreur est survenue lors de l'enregistrement de votre demande de chéquier. Veuillez réessayer plus tard.`;
        });
    }
  }
}
