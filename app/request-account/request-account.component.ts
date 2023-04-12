import { Component } from '@angular/core';

@Component({
  selector: 'app-request-account',
  templateUrl: './request-account.component.html',
  styleUrls: ['./request-account.component.css']
})
export class RequestAccountComponent {
listAccount = [{
  "accountId" : "1",
  "numCompte" : "1001406030788",
  "solde":"1000",
  "typeCompte":"Compte Cheque",
  "rib":"10404100140603078855"
},
{
  "accountId" : "2",
  "numCompte" : "1005138137788",
  "solde":"15 0000",
  "typeCompte":"Compte Epargne",
  "rib":"10404100513813778855"
}]
}

