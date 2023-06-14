import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Chart from 'chart.js';


interface DemandeCartes {
  email: string;
  cin: string;
  rib: string;
  cardType: string;
  action: string;
  statut: string;
  docId?: string; // Added property for document ID
  uid: string;
  accountType: string; // Added property for account type


  
}

@Component({
  selector: 'app-demande-carte',
  templateUrl: './demande-carte.component.html',
  styleUrls: ['./demande-carte.component.css']
})
export class DemandeCarteComponent implements OnInit {
  demandeCartesCollection: AngularFirestoreCollection<DemandeCartes>;
  demandeCartes: Observable<DemandeCartes[]> | undefined; // Initialize as undefined
  dataSource: MatTableDataSource<DemandeCartes>;
  filterValue: string = '';

  displayedColumns: string[] = ['email', 'cin', 'cardType', 'accountType', 'action', 'statut'];

  constructor(private fs: AngularFirestore, private snackBar: MatSnackBar) {
    this.demandeCartesCollection = this.fs.collection<DemandeCartes>('DemandeCartes');
    this.dataSource = new MatTableDataSource<DemandeCartes>();
  }

  ngOnInit(): void {
    this.fetchDemandeCartesData();
  }

  fetchDemandeCartesData(): void {
    this.demandeCartes = this.demandeCartesCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as DemandeCartes;
          const docId = a.payload.doc.id;
          return { docId, ...data };
        })
      )
    );
    this.demandeCartes.subscribe((data: DemandeCartes[]) => {
      this.dataSource.data = data;
    });

    this.demandeCartes.subscribe((data: DemandeCartes[]) => {
      this.dataSource.data = data;
      this.createUserRequestChart(); // Generate the user request chart
    });
  }
  applyFilter(): void {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  refuserDemande(demande: DemandeCartes): void {
    demande.statut = 'Demande refusée';
    this.updateDemande(demande);
    this.snackBar.open('Demande de carte refusée', 'Fermer', { duration: 3000 });
  }

  accepterDemande(demande: DemandeCartes): void {
    demande.statut = 'Demande acceptée';
    this.updateDemande(demande);
    this.snackBar.open('Demande de carte acceptée', 'Fermer', { duration: 3000 });

  }

 

  private updateDemande(demande: DemandeCartes): void {
    // Mettez à jour la demande dans la base de données
    const { docId, ...updatedDemande } = demande;
    this.demandeCartesCollection.doc(docId).update(updatedDemande);
  }
  createUserRequestChart() {
    const totalUsers = this.dataSource.data.length;
    const totalAcceptedRequests = this.dataSource.data.filter(d => d.statut === 'Demande acceptée').length;
    const totalRejectedRequests = this.dataSource.data.filter(d => d.statut === 'Demande refusée').length;
    const totalPendingRequests = totalUsers - totalAcceptedRequests - totalRejectedRequests;
  
    const chartElement = document.getElementById('userRequestChart') as HTMLCanvasElement;
    const ctx = chartElement.getContext('2d');
  
    if (ctx) {
      const chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Utilisateurs avec demande acceptée', 'Utilisateurs avec demande refusée', 'Utilisateurs avec demande en attente'],
          datasets: [{
            data: [totalAcceptedRequests, totalRejectedRequests, totalPendingRequests],
            backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(192, 192, 75, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)', 'rgba(192, 192, 75, 1)'],
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Répartition des demandes des utilisateurs'
          }
        }
      });
  
      // Adjust the size of the pie chart by modifying the canvas element's width and height
      if (chart && chart.canvas) {
        chart.canvas.style.width = '600px';
        chart.canvas.style.height = '400px';
        chart.canvas.style.margin = '0 auto';
        chart.canvas.style.marginTop = '20px';
      }
    }
  }
  
  
}  