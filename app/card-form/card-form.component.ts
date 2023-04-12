import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {
  cardTypes = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'american-express', label: 'American Express' }
  ];

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
