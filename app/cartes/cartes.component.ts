import { Component } from '@angular/core';

@Component({
  selector: 'app-cartes',
  templateUrl: './cartes.component.html',
  styleUrls: ['./cartes.component.css']
})
export class CartesComponent {


  listCartes = [{
    "CardHolderName":"John",
    "CardNumber" : "1001406030788",
    "ExpirationDate":"01/23",
    "CVV":"123",
  },
 ]
}