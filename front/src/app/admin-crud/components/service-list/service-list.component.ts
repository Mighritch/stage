import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ServiceE } from '../../models/service.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-list',
  template: `
    <h2>Service List</h2>
    <button mat-raised-button color="primary" (click)="navigateToCreate()">Add Service</button>
    <table mat-table [dataSource]="services" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let service">{{ service.id.codSoc }}/{{ service.id.codServ }}</td>
      </ng-container>
      <ng-container matColumnDef="libServ">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let service">{{ service.libServ }}</td>
      </ng-container>
      <ng-container matColumnDef="abrServ">
        <th mat-header-cell *matHeaderCellDef>Abbreviation</th>
        <td mat-cell *matCellDef="let service">{{ service.abrServ }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let service">
          <button mat-button (click)="editService(service)">Edit</button>
          <button mat-button color="warn" (click)="deleteService(service)">Delete</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
      margin-top: 20px;
    }
    button {
      margin: 5px;
    }
  `]
})
export class ServiceListComponent implements OnInit {
  services: ServiceE[] = [];
  displayedColumns: string[] = ['id', 'libServ', 'abrServ', 'actions'];

  constructor(private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.serviceService.getAll().subscribe(data => {
      this.services = data;
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/services/create']);
  }

  editService(service: ServiceE): void {
    this.router.navigate([`/services/edit/${service.id.codSoc}/${service.id.codServ}`]);
  }

  deleteService(service: ServiceE): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.delete(service.id).subscribe(() => {
        this.services = this.services.filter(s => s.id !== service.id);
      });
    }
  }
}