import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminCrudModule } from './admin-crud/admin-crud.module';
import { AuthModule } from './auth/auth.module'; // Nouveau module d'authentification
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule, // Ajout du module d'authentification
    AdminCrudModule,
     MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    // Ajoutez vos services globaux ici si nécessaire
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }