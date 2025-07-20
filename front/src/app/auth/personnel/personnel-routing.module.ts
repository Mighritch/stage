import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelDashboardComponent } from '../personnel-dashboard/personnel-dashboard.component';
import { PersonnelAuthGuard } from '../guards/personnel-auth.guard';

const routes: Routes = [
  { 
    path: 'personnel',
    children: [
      { path: 'dashboard', component: PersonnelDashboardComponent, canActivate: [PersonnelAuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelRoutingModule { }