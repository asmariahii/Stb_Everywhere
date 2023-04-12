import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})

export class AccountDetailsComponent implements OnInit {
  Account = [{
    "id":"1",
    "dateOperation" : "01/02/2022",
    "Operation":"Retrait DAB",
    "typeOperation":"Retrait DAB ATM",
    "Montant":"100",
    "reference":"FT23087XL8G "
  },
  {
    "id":"1",
    "dateOperation" : "01/02/2022",
    "Operation":"Retrait DAB",
    "typeOperation":"Retrait DAB ATM",
    "Montant":"100",
    "reference":"FT23087XL8G "
  },
  {
    "id":"2",
    "dateOperation" : "01/02/2022",
    "Operation":" Virement",
    "typeOperation":"Virement",
    "Montant":"100",
    "reference":"FT23087XL8G "
  }

  
]

sub : any;
id: any ;
constructor(private activatedRoute : ActivatedRoute) {
console.log('Hi constructor')  
}


ngOnInit(): void {
  console.log('Hi OnInit') 
  this.sub = this.activatedRoute.params.subscribe(params => {
    this.id = params['id']
    console.log(this.id)
  })
let accountRep : any
accountRep = []
  this.Account.forEach(element => {
    if (element.id == this.id)
    accountRep.push(element)
  });

  this.Account = accountRep
}

}

