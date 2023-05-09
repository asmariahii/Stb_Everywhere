import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homepage/home/home.component';
import { ProfilComponent } from './profil/profil.component';

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
  
  { path: 'signup', loadChildren: () => import('./homepage/signup/signup.module').then(m => m.SignupModule) },
  
  { path: 'login', loadChildren: () => import('./homepage/login/login.module').then(m => m.LoginModule) },
  {path:'profil',component:ProfilComponent}

];
   
  

  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
