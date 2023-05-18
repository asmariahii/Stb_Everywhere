import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  
  {
    path: '',
    component: HomeComponent
  },
  
  
    
 
  {
    path: 'home',
    loadChildren: () => import('./espace-client/espace-client.module').then(mod => mod.EspaceClientModule),
    data: { breadcrumb: 'Home' }
  },
  {path:'register',component:RegisterComponent},

  
  
  { path: 'login', loadChildren: () => import('./homepage/login/login.module').then(m => m.LoginModule) },
  
  { path: 'espace-admin', loadChildren: () => import('./espace-admin/espace-admin.module').then(m => m.EspaceAdminModule) },


];
   
  

  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
