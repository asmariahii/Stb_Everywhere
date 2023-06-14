import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface DemandeCartes {
  email: string;
  cin: string;
  rib: string;
  cardType: string;
  action: string;
  statut: string;
  docId?: string;
  uid: string;
}

@Component({
  selector: 'app-cartes',
  templateUrl: './cartes.component.html',
  styleUrls: ['./cartes.component.css']
})
export class CartesComponent implements OnInit {
  demandeCartesCollection: AngularFirestoreCollection<DemandeCartes>;
  demandesUtilisateur: DemandeCartes[] = [];
  uidUtilisateurConnecte = ''; // Initialize with an empty string

  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.demandeCartesCollection = this.fs.collection<DemandeCartes>('DemandeCartes');
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.uidUtilisateurConnecte = user.uid;
        this.fetchDemandesUtilisateur();
      }
    });
  }

  fetchDemandesUtilisateur(): void {
    this.demandeCartesCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as DemandeCartes;
          const docId = a.payload.doc.id;
          return { docId, ...data };
        })
      )
    ).subscribe((data: DemandeCartes[]) => {
      // Filtrer les demandes de cartes de l'utilisateur connecté
      this.demandesUtilisateur = data.filter(demande =>
        demande.uid === this.uidUtilisateurConnecte
      );
    });
  }
}