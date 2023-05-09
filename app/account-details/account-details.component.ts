import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  Account: Account[] = [
    {
      "id": "1",
      "dateOperation": "01/02/2022",
      "Operation": "Retrait DAB",
      "typeOperation": "Retrait DAB ATM",
      "Montant": "200 TND",
      "reference": "FT23087XL8G "
    },
    {
      "id": "1",
      "dateOperation": "01/02/2023",
      "Operation": "Prélèvement",
      "typeOperation": "Prélèvement",
      "Montant": "100 TND",
      "reference": "FT23087XL8G "
    },
    {
      "id": "2",
      "dateOperation": "01/02/2022",
      "Operation": "Virement",
      "typeOperation": "Virement",
      "Montant": "100",
      "reference": "FT23087XL8G "
    }

  ];

  filteredAccount: Account[] = [];

  startDate: string = '';
  endDate: string = '';

  sub: any;
  id: any;

  constructor(private activatedRoute: ActivatedRoute) {
    console.log('Hi constructor')
  }

  ngOnInit(): void {
    console.log('Hi OnInit')
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
      console.log(this.id)
    })

    // Filter accounts by id
    let accountRep: Account[] = [];
    this.Account.forEach(element => {
      if (element.id === this.id) {
        accountRep.push(element);
      }
    });

    this.filteredAccount = accountRep;
  }

  filterByPeriod(period: string) {
    this.filteredAccount = this.Account.filter(c => c.dateOperation === period);
  }

  filterByDate() {
    this.filteredAccount = this.Account.filter(c => {
      const date = new Date(c.dateOperation);
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      return date >= startDate && date <= endDate;
    });
  }
}
