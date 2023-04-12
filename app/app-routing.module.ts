import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  
  {
    path: 'home',
    loadChildren: () => import('./espace-client/espace-client.module').then(mod => mod.EspaceClientModule),
    data: { breadcrumb: 'Home' }
  },
];
   
  

  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
