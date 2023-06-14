import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

interface DemandeCheque {
  uid: string;
  nombreChequier: number | null;
  email: string;
  rib: string;
  cin: string;
  statut: string;
}


@Component({
  selector: 'app-cheque-form',
  templateUrl: './cheque-form.component.html',
  styleUrls: ['./cheque-form.component.css']
})
export class ChequeFormComponent implements OnInit {
  Uid: string | null = null;
  formSubmitted: boolean = false;
  nombreChequier: number | null = null;
  nombreChequiersOptions = [25, 50];
  messageSent = false;
  message = '';
  demande$: Observable<DemandeCheque[]> | undefined;
  demandesUtilisateur: DemandeCheque[] = [];



  demandeChequeCollection: AngularFirestoreCollection<DemandeCheque>;

  constructor(private fs: AngularFirestore, private as: AuthService, private afAuth: AngularFireAuth) {
    this.demandeChequeCollection = this.fs.collection<DemandeCheque>('DemandeCheque');
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.Uid = user.uid;
        this.fetchDemandesUtilisateur();
      }
    });

    const formSubmitted = localStorage.getItem('formSubmitted');
    if (formSubmitted) {
      this.formSubmitted = true;
    }
  }

  fetchDemandesUtilisateur(): void {
    this.demandeChequeCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as DemandeCheque;
          const docId = a.payload.doc.id;
          return { docId, ...data };
        })
      )
    ).subscribe((data: DemandeCheque[]) => {
      // Filtrer les demandes de cartes de l'utilisateur connecté
      this.demandesUtilisateur = data.filter(demande =>
        demande.uid === this.Uid
      );
    });
  }
  

  async AddDemandeCheque(form: NgForm): Promise<void> {
    try {
      const email = await this.as.getUserEmail();
      const cin = await this.as.getUserCin();
      const rib = await this.as.getUserRib();

      const demandeCheque: DemandeCheque = {
        uid: this.Uid || '', // Utilisez une valeur par défaut si this.Uid est null
        nombreChequier: this.nombreChequier,
        email: email || '',
        cin: cin || '',
        rib: rib || '',
        statut: 'demande en attente' // Le statut est vide ici
      };

      const docRef = await this.demandeChequeCollection.add(demandeCheque);
      const docId = docRef.id;

      this.messageSent = true;
      this.message = `Votre demande de chéquier a été soumise.`;
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la demande dans la base de données :", error);
      this.messageSent = true;
      this.message = `Une erreur est survenue lors de l'enregistrement de votre demande de chéquier. Veuillez réessayer plus tard.`;
    }
  }
}
