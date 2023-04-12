import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cheque-form',
  templateUrl: './cheque-form.component.html',
  styleUrls: ['./cheque-form.component.css']
})
export class ChequeFormComponent {
  nombreChequiersOptions = [1, 2, 3, 4, 5];

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
