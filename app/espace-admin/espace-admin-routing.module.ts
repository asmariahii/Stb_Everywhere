import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceAdminComponent } from './espace-admin.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{ path: '', component: EspaceAdminComponent,
children:[
  {path:'users',component:UsersComponent,},]


}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceAdminRoutingModule { }
