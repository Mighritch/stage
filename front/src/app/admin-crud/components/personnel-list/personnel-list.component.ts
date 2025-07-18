import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../../services/personnel.service';
import { Personnel } from '../../models/personnel.models';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-personnel-list',
  template: `
    <h2>Personnel List</h2>
    <div class="action-buttons">
      <button mat-raised-button color="primary" (click)="navigateToCreate()">Add Personnel</button>
      <button mat-raised-button color="accent" (click)="exportPdf()">Export to PDF</button>
    </div>
    <table mat-table [dataSource]="personnels" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let personnel">{{ personnel.id.codSoc }}/{{ personnel.id.matPers }}</td>
      </ng-container>
      <ng-container matColumnDef="nomPers">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let personnel">{{ personnel.nomPers }} {{ personnel.prenPers }}</td>
      </ng-container>
      <ng-container matColumnDef="service">
        <th mat-header-cell *matHeaderCellDef>Service</th>
        <td mat-cell *matCellDef="let personnel">{{ personnel.service?.libServ || 'N/A' }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let personnel">
          <button mat-button (click)="editPersonnel(personnel)">Edit</button>
          <button mat-button color="warn" (click)="deletePersonnel(personnel)">Delete</button>
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
    .action-buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    button {
      margin: 5px;
    }
  `]
})
export class PersonnelListComponent implements OnInit {
  personnels: Personnel[] = [];
  displayedColumns: string[] = ['id', 'nomPers', 'service', 'actions'];

  constructor(
    private personnelService: PersonnelService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPersonnels();
  }

  loadPersonnels(): void {
    this.personnelService.getAll().subscribe({
      next: (data) => {
        this.personnels = data;
        console.log('Personnels loaded:', data);
      },
      error: (err) => {
        console.error('Error loading personnels:', err);
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/personnels/create']);
  }

  editPersonnel(personnel: Personnel): void {
    this.router.navigate([`/personnels/edit/${personnel.id.codSoc}/${personnel.id.matPers}`]);
  }

  deletePersonnel(personnel: Personnel): void {
    if (confirm('Are you sure you want to delete this personnel?')) {
      this.personnelService.delete(personnel.id).subscribe({
        next: () => {
          this.personnels = this.personnels.filter(p => 
            p.id.codSoc !== personnel.id.codSoc || 
            p.id.matPers !== personnel.id.matPers
          );
          console.log('Personnel deleted:', personnel.id);
        },
        error: (err) => {
          console.error('Error deleting personnel:', err);
        }
      });
    }
  }

  exportPdf(): void {
    this.personnelService.exportPdf().subscribe({
      next: (pdfBlob: Blob) => {
        saveAs(pdfBlob, `personnel_list_${new Date().toISOString().slice(0, 10)}.pdf`);
      },
      error: (err) => {
        console.error('Error exporting PDF:', err);
        alert('Error while exporting PDF. Please try again.');
      }
    });
  }
}