import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelListComponent } from './components/personnel-list/personnel-list.component';
import { PersonnelFormComponent } from './components/personnel-form/personnel-form.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin/personnels', 
    component: PersonnelListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin/personnels/create', 
    component: PersonnelFormComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin/personnels/edit/:codSoc/:matPers', 
    component: PersonnelFormComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin/services', 
    component: ServiceListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin/services/create', 
    component: ServiceFormComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin/services/edit/:codSoc/:codServ', 
    component: ServiceFormComponent,
    canActivate: [AuthGuard] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCrudRoutingModule { }