import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { CardFormComponent } from '../card-form/card-form.component';
import { CartesComponent } from '../cartes/cartes.component';
import { ChequeFormComponent } from '../cheque-form/cheque-form.component';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { RequestAccountComponent } from '../request-account/request-account.component';
import { EspaceClientComponent } from './espace-client.component';

const routes: Routes = [
  { 
    path: '', 
    component: EspaceClientComponent, 
    children:[
        {path:'account',component:RequestAccountComponent,},
        {path:'edit',component:EditAccountComponent},
        {path:'details/:id',component:AccountDetailsComponent},
        {path:'cartes',component:CartesComponent},
        {path:'CardForm',component:CardFormComponent},
        {path:'ChequeForm',component:ChequeFormComponent},
        
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceClientRoutingModule { }
