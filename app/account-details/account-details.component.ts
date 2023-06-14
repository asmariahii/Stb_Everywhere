import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';


interface Account {
  id: string;
  dateOperation: string;
  Operation: string;
  typeOperation: string;
  Montant: string;
  reference: string;
}

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  
  startDate: string = '';
  endDate: string = '';
  transactionDate: string = '';
  transactionOperation: string = '';
  transactionType: string = '';
  transactionReference: string = '';
  transactionAmount: number | null = null;
  filteredAccount: Account[] = [];

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    const userConnect = localStorage.getItem("userConnect");
  
    if (userConnect) {
      this.firestore.collection("users").doc(userConnect).collection("transactions")
        .valueChanges()
        .subscribe(transactions => {
          this.filteredAccount = transactions.map(transaction => transaction as Account);
  
          // Création du graphique des transactions
          this.createTransactionChart();
        });
    }
  }
  createTransactionChart() {
    const transactionDates = this.filteredAccount.map(transaction => transaction.dateOperation);
    const transactionOperations = this.filteredAccount.map(transaction => Number(transaction.Montant));
  
    const chartElement = document.getElementById('transactionChart') as HTMLCanvasElement;
    const ctx = chartElement.getContext('2d');
  
    if (ctx) {
      new Chart(ctx, {
      type: 'line',
      data: {
        labels: transactionDates,
        datasets: [{
          label: 'Transactions',
          data: transactionOperations,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        // Spécifiez vos options de configuration du graphique ici
      }
    });
  }
  }

  filterByDate() {
    // Récupérer l'ID du compte à partir des paramètres de l'URL
    const accountId = this.route.snapshot.paramMap.get('id');

    // Logique pour filtrer les transactions par date
    // Utilisez les valeurs de startDate et endDate pour effectuer la requête Firestore
    if (this.startDate && this.endDate && accountId) {
      this.firestore.collection<Account>('accounts')
        .doc(accountId)
        .collection('transactions', ref => ref.where('dateOperation', '>=', this.startDate).where('dateOperation', '<=', this.endDate))
        .valueChanges()
        .subscribe(transactions => {
          // Traitez les transactions filtrées ici
          console.log(transactions);
        });
    }
  }
  
  addTransaction() {
    const transaction: Account = {
      id: '', // Vous pouvez générer un ID unique ici si nécessaire
      dateOperation: this.transactionDate,
      Operation: this.transactionOperation,
      typeOperation: this.transactionType,
      reference: this.transactionReference,
Montant: this.transactionAmount !== null ? this.transactionAmount.toString() : '',
    };
  
    const userConnect = localStorage.getItem("userConnect");
  
    if (userConnect) {
      this.firestore.collection("users").doc(userConnect).collection("transactions").add(transaction)
        .then(() => {
          // La transaction a été ajoutée avec succès
          // Réinitialisez les valeurs des champs du formulaire
          this.transactionDate = '';
          this.transactionOperation = '';
          this.transactionType = '';
          this.transactionReference = '';
          this.transactionAmount = null;

          // Récupérer les dernières transactions
          this.fetchTransactions();
        })
        .catch((error) => {
          // Une erreur s'est produite lors de l'ajout de la transaction
          console.error('Error adding transaction: ', error);
        });
    }
  }
  
}
