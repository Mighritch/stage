import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PersonnelLoginComponent } from './personnel-login/personnel-login.component'; // Ajoutez cette importation

const routes: Routes = [
  { 
    path: '',  
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'personnel-login', component: PersonnelLoginComponent }, // Ajoutez cette ligne
      { path: '', redirectTo: 'login', pathMatch: 'full' } // Redirection par défaut
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }