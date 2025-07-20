import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonnelDashboardComponent } from '../personnel-dashboard/personnel-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PersonnelDashboardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      { path: 'dashboard', component: PersonnelDashboardComponent }
    ])
  ]
})
export class PersonnelModule { }