import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Personnel } from '../../admin-crud/models/personnel.models';

@Component({
  selector: 'app-personnel-dashboard',
  templateUrl: './personnel-dashboard.component.html',
  styleUrls: ['./personnel-dashboard.component.css']
})
export class PersonnelDashboardComponent {
  personnel: Personnel;

  constructor(private authService: AuthService) {
    this.personnel = this.authService.getCurrentPersonnel()!;
  }
}