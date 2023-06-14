import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';

interface DemandeCartes {
  f1Name: string;
  rib: string;
  dateExpiration: string;
  uid: string;
  cin: string;
  cardType: string;
  email: string;
  statut: string; // Make the statut property optional
  accountType: string; // Ajoutez la propriété accountType à l'interface

}

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  formSubmitted: boolean = false;
  cardType: string = '';
  CardTypeOptions = ['Gold', 'Visa', 'MasterCard'];
  demandeEnvoyee: boolean = false;
  successMessage: string = '';
  selectedCardTypes: string[] = [];
  Uid: string | null = null;
  statut: string = 'Demande en attente'; // Initialisez le statut à "Demande en attente"
  newAccount = {
    accountType: '' // Initial value for account type
  }

  constructor(private fs: AngularFirestore, private as: AuthService) { }

  ngOnInit(): void {
    this.as.getUser().subscribe(user => {
      if (user) {
        this.Uid = user.uid;

        const selectedCardTypes = localStorage.getItem('selectedCardTypes');
        if (selectedCardTypes) {
          this.selectedCardTypes = JSON.parse(selectedCardTypes);
        }
      } else {
        console.error('Erreur lors de la récupération de l\'UID de l\'utilisateur.');
      }
    });

    const formSubmitted = localStorage.getItem('formSubmitted');
    if (formSubmitted) {
      this.formSubmitted = true;
    }
  }

  async AddDemandeCartes(form: NgForm): Promise<void> {
    this.selectedCardTypes.push(this.cardType);

    localStorage.setItem('selectedCardTypes', JSON.stringify(this.selectedCardTypes));
    try {
      const email = await this.as.getUserEmail();
      const cin = await this.as.getUserCin();
      const rib = await this.as.getUserRib();

      const demandeCartes: DemandeCartes = {
        f1Name: '',
        rib: rib || '',
        dateExpiration: '',
        uid: this.Uid || '', // Utilisez une valeur par défaut si this.Uid est null
        cin: cin || '',
        cardType: this.cardType || '',
        email: email || '',
        statut: 'Demande en attente', // Initialisez le statut à "Demande en attente"
        accountType: this.newAccount.accountType || '' // Ajoutez la propriété accountType avec sa valeur

      };

      this.fs.collection<DemandeCartes>('DemandeCartes').add(demandeCartes)
        .then(() => {
          form.resetForm();
          this.cardType = '';
          this.formSubmitted = true;
          this.demandeEnvoyee = true;
          this.successMessage = 'Votre demande de cartes a été envoyée avec succès !';
          // Store the form submission status in local storage
          localStorage.setItem('formSubmitted', 'true');
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la demande de cartes :', error);
          this.formSubmitted = false;
          this.demandeEnvoyee = false;
          this.successMessage = '';
        });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'e-mail, du CIN ou du RIB de l\'utilisateur :', error);
    }
  }

  isCardTypeAlreadySelected(option: string): boolean {
    return this.selectedCardTypes.includes(option);
  }
}
