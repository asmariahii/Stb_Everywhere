import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceAdminComponent } from './espace-admin.component';
import { UsersComponent } from './users/users.component';
import { DemandeChequeComponent } from './demande-cheque/demande-cheque.component';
import { DemandeCarteComponent } from './demande-carte/demande-carte.component';

const routes: Routes = [{ path: '', component: EspaceAdminComponent,
children:[
  {path:'users',component:UsersComponent,},
  {path:'demande-cheque',component:DemandeChequeComponent,},
  {path:'demande-carte',component:DemandeCarteComponent}

]


}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceAdminRoutingModule { }
