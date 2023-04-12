import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceClientComponent } from './espace-client.component';
import { RequestAccountComponent } from '../request-account/request-account.component';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { EspaceClientRoutingModule } from './espace-client.routing.modules';
import { FormsModule } from '@angular/forms';
import { CartesComponent } from '../cartes/cartes.component';
import { CardFormComponent } from '../card-form/card-form.component';
import { ChequeFormComponent } from '../cheque-form/cheque-form.component';

@NgModule({
  declarations: [
    EspaceClientComponent,
    AccountDetailsComponent,
    EditAccountComponent,
    RequestAccountComponent,
    CartesComponent,
    CardFormComponent,
    ChequeFormComponent
  ],
  imports: [
    CommonModule,
    EspaceClientRoutingModule,
    FormsModule
  ],
  exports: [EspaceClientComponent] 

})
export class EspaceClientModule { }
