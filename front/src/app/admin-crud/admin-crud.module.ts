import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // Ajout
import { HttpClientModule } from '@angular/common/http';
import { AdminCrudRoutingModule } from './admin-crud-routing.module';
import { PersonnelListComponent } from './components/personnel-list/personnel-list.component';
import { PersonnelFormComponent } from './components/personnel-form/personnel-form.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';

@NgModule({
  declarations: [
    PersonnelListComponent,
    PersonnelFormComponent,
    ServiceListComponent,
    ServiceFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminCrudRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule // Ajout
  ]
})
export class AdminCrudModule { }