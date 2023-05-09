import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspaceClientModule } from './espace-client/espace-client.module';
import { CardFormComponent } from './card-form/card-form.component';
import { ChequeFormComponent } from './cheque-form/cheque-form.component';
import { HomeComponent } from './homepage/home/home.component';
import { FooterComponent } from './homepage/footer/footer.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from './material/material/material.module';
import { MatCardModule } from '@angular/material/card';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { ProfilComponent } from './profil/profil.component';
import { AuthService } from './shared/auth.service';
import { UserService } from './services/user.service';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    ProfilComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    EspaceClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MaterialModule,
    MatCardModule,
    EspaceClientModule,
    AngularFireDatabaseModule,



   
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}

export { EspaceClientModule };

