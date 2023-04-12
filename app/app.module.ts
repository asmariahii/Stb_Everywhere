import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspaceClientModule } from './espace-client/espace-client.module';
import { CardFormComponent } from './card-form/card-form.component';
import { ChequeFormComponent } from './cheque-form/cheque-form.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    EspaceClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}

export { EspaceClientModule };

