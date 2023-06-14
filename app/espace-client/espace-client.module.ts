import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceClientComponent } from './espace-client.component';
import { RequestAccountComponent } from '../request-account/request-account.component';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { EspaceClientRoutingModule } from './espace-client.routing.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartesComponent } from '../cartes/cartes.component';
import { CardFormComponent } from '../card-form/card-form.component';
import { ChequeFormComponent } from '../cheque-form/cheque-form.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

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
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    AngularFirestoreModule,
    MatFormFieldModule,    MatTableModule ,// Ajoutez MatTableModule dans la liste des imports
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule



    
  ],

})
export class EspaceClientModule { }
