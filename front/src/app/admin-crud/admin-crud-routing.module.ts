import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelListComponent } from './components/personnel-list/personnel-list.component';
import { PersonnelFormComponent } from './components/personnel-form/personnel-form.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';

const routes: Routes = [
  { path: 'personnels', component: PersonnelListComponent },
  { path: 'personnels/create', component: PersonnelFormComponent },
  { path: 'personnels/edit/:codSoc/:matPers', component: PersonnelFormComponent },
  { path: 'services', component: ServiceListComponent },
  { path: 'services/create', component: ServiceFormComponent },
  { path: 'services/edit/:codSoc/:codServ', component: ServiceFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminCrudRoutingModule { }