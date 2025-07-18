import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../../services/personnel.service';
import { Personnel } from '../../models/personnel.models';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-personnel-list',
  template: `
    <h2>Liste du Personnel</h2>
    <div class="action-buttons">
      <button mat-raised-button color="primary" (click)="navigateToCreate()">
        <mat-icon>add</mat-icon> Ajouter
      </button>
      <button mat-raised-button color="accent" (click)="exportPdf()">
        <mat-icon>picture_as_pdf</mat-icon> Exporter PDF
      </button>
    </div>
    
    <div class="table-container">
      <table mat-table [dataSource]="personnels" class="mat-elevation-z8">
        <!-- Colonne Nom -->
        <ng-container matColumnDef="nomPers">
          <th mat-header-cell *matHeaderCellDef>Nom</th>
          <td mat-cell *matCellDef="let personnel">{{ personnel.nomPers }}</td>
        </ng-container>

        <!-- Colonne Prénom -->
        <ng-container matColumnDef="prenPers">
          <th mat-header-cell *matHeaderCellDef>Prénom</th>
          <td mat-cell *matCellDef="let personnel">{{ personnel.prenPers }}</td>
        </ng-container>

        <!-- Colonne CIN -->
        <ng-container matColumnDef="cin">
          <th mat-header-cell *matHeaderCellDef>CIN</th>
          <td mat-cell *matCellDef="let personnel">{{ personnel.cin || '-' }}</td>
        </ng-container>

        <!-- Colonne Matricule -->
        <ng-container matColumnDef="matricule">
          <th mat-header-cell *matHeaderCellDef>Matricule</th>
          <td mat-cell *matCellDef="let personnel">{{ personnel.id.matPers }}</td>
        </ng-container>

        <!-- Colonne Service -->
        <ng-container matColumnDef="service">
          <th mat-header-cell *matHeaderCellDef>Service</th>
          <td mat-cell *matCellDef="let personnel">
            {{ personnel.service?.id.codServ || '-' }}
          </td>
        </ng-container>

        <!-- Colonne Actions -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let personnel">
            <button mat-icon-button color="primary" (click)="editPersonnel(personnel)" matTooltip="Modifier">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deletePersonnel(personnel)" matTooltip="Supprimer">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>

    <mat-paginator [length]="personnels.length"
                   [pageSize]="10"
                   [pageSizeOptions]="[5, 10, 25]"
                   showFirstLastButtons>
    </mat-paginator>
  `,
  styles: [`
    .table-container {
      overflow-x: auto;
      margin-top: 20px;
    }
    table {
      width: 100%;
    }
    .action-buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    th.mat-header-cell {
      font-weight: bold;
      background-color: #f5f5f5;
    }
    td.mat-cell {
      padding: 8px 16px;
    }
    .mat-column-actions {
      width: 120px;
      text-align: center;
    }
  `]
})
export class PersonnelListComponent implements OnInit {
  personnels: Personnel[] = [];
  displayedColumns: string[] = ['nomPers', 'prenPers', 'cin', 'matricule', 'service', 'actions'];

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
      },
      error: (err) => {
        console.error('Erreur lors du chargement:', err);
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
    if (confirm(`Confirmez-vous la suppression de ${personnel.nomPers} ${personnel.prenPers} ?`)) {
      this.personnelService.delete(personnel.id).subscribe({
        next: () => {
          this.personnels = this.personnels.filter(p => 
            p.id.codSoc !== personnel.id.codSoc || 
            p.id.matPers !== personnel.id.matPers
          );
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
        }
      });
    }
  }

  exportPdf(): void {
    this.personnelService.exportPdf().subscribe({
      next: (pdfBlob: Blob) => {
        saveAs(pdfBlob, `liste_personnel_${new Date().toISOString().slice(0, 10)}.pdf`);
      },
      error: (err) => {
        console.error('Erreur lors de l\'export:', err);
      }
    });
  }
}