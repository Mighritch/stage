import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonnelService } from '../../services/personnel.service';
import { ServiceService } from '../../services/service.service';
import { Personnel, PersonnelId } from '../../models/personnel.models';
import { ServiceE, ServiceId } from '../../models/service.model';

@Component({
  selector: 'app-personnel-form',
  template: `
    <div *ngIf="isLoading">Loading services...</div>
    <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
    <h2>{{ isEdit ? 'Edit Personnel' : 'Add Personnel' }}</h2>
    <form [formGroup]="personnelForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Company Code</mat-label>
        <input matInput formControlName="codSoc" required>
        <mat-error *ngIf="personnelForm.get('codSoc')?.hasError('required')">
          Company Code is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Personnel ID</mat-label>
        <input matInput formControlName="matPers" required>
        <mat-error *ngIf="personnelForm.get('matPers')?.hasError('required')">
          Personnel ID is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Last Name</mat-label>
        <input matInput formControlName="nomPers" required>
        <mat-error *ngIf="personnelForm.get('nomPers')?.hasError('required')">
          Last Name is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>First Name</mat-label>
        <input matInput formControlName="prenPers" required>
        <mat-error *ngIf="personnelForm.get('prenPers')?.hasError('required')">
          First Name is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Arabic Last Name</mat-label>
        <input matInput formControlName="nomPersA">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Arabic First Name</mat-label>
        <input matInput formControlName="prenPersA">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Maiden Name</mat-label>
        <input matInput formControlName="nomJf">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Arabic Maiden Name</mat-label>
        <input matInput formControlName="nomJfA">
      </mat-form-field>
      <mat-form-field>
        <mat-label>CIN</mat-label>
        <input matInput formControlName="cin">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Sex</mat-label>
        <mat-select formControlName="sexe" required>
          <mat-option value="M">Male</mat-option>
          <mat-option value="F">Female</mat-option>
        </mat-select>
        <mat-error *ngIf="personnelForm.get('sexe')?.hasError('required')">
          Sex is required
        </mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Situation Code</mat-label>
        <input matInput formControlName="codSit">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Situation Date</mat-label>
        <input matInput [matDatepicker]="datSitPicker" formControlName="datSit">
        <mat-datepicker-toggle matSuffix [for]="datSitPicker"></mat-datepicker-toggle>
        <mat-datepicker #datSitPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Family Head</mat-label>
        <mat-select formControlName="chefFam">
          <mat-option value="Y">Yes</mat-option>
          <mat-option value="N">No</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Number of Children</mat-label>
        <input matInput type="number" formControlName="nbreEnf">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Child Allowance</mat-label>
        <mat-select formControlName="chargEnf">
          <mat-option value="Y">Yes</mat-option>
          <mat-option value="N">No</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Other Allowance</mat-label>
        <mat-select formControlName="chargAll">
          <mat-option value="Y">Yes</mat-option>
          <mat-option value="N">No</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Family Function</mat-label>
        <input matInput formControlName="fctFam">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Entry Date</mat-label>
        <input matInput [matDatepicker]="datEntPicker" formControlName="datEnt">
        <mat-datepicker-toggle matSuffix [for]="datEntPicker"></mat-datepicker-toggle>
        <mat-datepicker #datEntPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Titularization Date</mat-label>
        <input matInput [matDatepicker]="datTitPicker" formControlName="datTit">
        <mat-datepicker-toggle matSuffix [for]="datTitPicker"></mat-datepicker-toggle>
        <mat-datepicker #datTitPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Function Code</mat-label>
        <input matInput formControlName="codFonct">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Category Code</mat-label>
        <input matInput formControlName="codCateg">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Category</mat-label>
        <input matInput formControlName="codCat">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Grade Code</mat-label>
        <input matInput formControlName="codGrad">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Motif Code</mat-label>
        <input matInput formControlName="codMotif">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Nationality Code</mat-label>
        <input matInput formControlName="codNatp">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Status Code</mat-label>
        <input matInput formControlName="codStat">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Service Date</mat-label>
        <input matInput [matDatepicker]="datServPicker" formControlName="datServ">
        <mat-datepicker-toggle matSuffix [for]="datServPicker"></mat-datepicker-toggle>
        <mat-datepicker #datServPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Function Date</mat-label>
        <input matInput [matDatepicker]="datFonctPicker" formControlName="datFonct">
        <mat-datepicker-toggle matSuffix [for]="datFonctPicker"></mat-datepicker-toggle>
        <mat-datepicker #datFonctPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Qualification Date</mat-label>
        <input matInput [matDatepicker]="datQualfPicker" formControlName="datQualf">
        <mat-datepicker-toggle matSuffix [for]="datQualfPicker"></mat-datepicker-toggle>
        <mat-datepicker #datQualfPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Category Date</mat-label>
        <input matInput [matDatepicker]="datCategPicker" formControlName="datCateg">
        <mat-datepicker-toggle matSuffix [for]="datCategPicker"></mat-datepicker-toggle>
        <mat-datepicker #datCategPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Cat Date</mat-label>
        <input matInput [matDatepicker]="datCatPicker" formControlName="datCat">
        <mat-datepicker-toggle matSuffix [for]="datCatPicker"></mat-datepicker-toggle>
        <mat-datepicker #datCatPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Grade Date</mat-label>
        <input matInput [matDatepicker]="datGradPicker" formControlName="datGrad">
        <mat-datepicker-toggle matSuffix [for]="datGradPicker"></mat-datepicker-toggle>
        <mat-datepicker #datGradPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Echelon Date</mat-label>
        <input matInput [matDatepicker]="datEchPicker" formControlName="datEch">
        <mat-datepicker-toggle matSuffix [for]="datEchPicker"></mat-datepicker-toggle>
        <mat-datepicker #datEchPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Hiring Date</mat-label>
        <input matInput [matDatepicker]="datEmbPicker" formControlName="datEmb">
        <mat-datepicker-toggle matSuffix [for]="datEmbPicker"></mat-datepicker-toggle>
        <mat-datepicker #datEmbPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Motif Date</mat-label>
        <input matInput [matDatepicker]="datMotifPicker" formControlName="datMotif">
        <mat-datepicker-toggle matSuffix [for]="datMotifPicker"></mat-datepicker-toggle>
        <mat-datepicker #datMotifPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Birth Date</mat-label>
        <input matInput [matDatepicker]="datNaisPicker" formControlName="datNais">
        <mat-datepicker-toggle matSuffix [for]="datNaisPicker"></mat-datepicker-toggle>
        <mat-datepicker #datNaisPicker></mat-datepicker>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Activity Status</mat-label>
        <input matInput formControlName="etatAct">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Service</mat-label>
        <mat-select formControlName="serviceCodServ" required>
          <mat-option *ngFor="let service of services" [value]="service.id.codServ">
            {{ service.libServ }} ({{ service.id.codSoc }}/{{ service.id.codServ }})
          </mat-option>
        </mat-select>
        <mat-error *ngIf="personnelForm.get('serviceCodServ')?.hasError('required')">
          Service is required
        </mat-error>
      </mat-form-field>
      <div>
        <button mat-raised-button color="primary" type="submit" [disabled]="personnelForm.invalid">Save</button>
        <button mat-raised-button color="accent" (click)="cancel()">Cancel</button>
      </div>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 16px;
    }
    mat-form-field {
      width: 45%;
    }
    button {
      margin: 10px;
    }
    .error {
      color: red;
      margin-bottom: 10px;
    }
  `]
})
export class PersonnelFormComponent implements OnInit {
  personnelForm: FormGroup;
  isEdit: boolean = false;
  services: ServiceE[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private personnelService: PersonnelService,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personnelForm = this.fb.group({
      codSoc: ['', Validators.required],
      matPers: ['', Validators.required],
      nomPers: ['', Validators.required],
      prenPers: ['', Validators.required],
      nomPersA: [''],
      prenPersA: [''],
      nomJf: [''],
      nomJfA: [''],
      cin: [''],
      sexe: ['', Validators.required],
      codSit: [''],
      datSit: [''],
      chefFam: [''],
      nbreEnf: [''],
      chargEnf: [''],
      chargAll: [''],
      fctFam: [''],
      datEnt: [''],
      datTit: [''],
      codFonct: [''],
      codCateg: [''],
      codCat: [''],
      codGrad: [''],
      codMotif: [''],
      codNatp: [''],
      codStat: [''],
      datServ: [''],
      datFonct: [''],
      datQualf: [''],
      datCateg: [''],
      datCat: [''],
      datGrad: [''],
      datEch: [''],
      datEmb: [''],
      datMotif: [''],
      datNais: [''],
      etatAct: [''],
      serviceCodServ: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.serviceService.getAll().subscribe({
      next: (services) => {
        this.services = services;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load services. Please try again later.';
        console.error('Error loading services:', err);
      }
    });

    const codSoc = this.route.snapshot.paramMap.get('codSoc');
    const matPers = this.route.snapshot.paramMap.get('matPers');
    if (codSoc && matPers) {
      this.isEdit = true;
      this.personnelService.getById({ codSoc, matPers }).subscribe({
        next: (personnel) => {
          this.personnelForm.patchValue({
            codSoc: personnel.id.codSoc,
            matPers: personnel.id.matPers,
            nomPers: personnel.nomPers,
            prenPers: personnel.prenPers,
            nomPersA: personnel.nomPersA || '',
            prenPersA: personnel.prenPersA || '',
            nomJf: personnel.nomJf || '',
            nomJfA: personnel.nomJfA || '',
            cin: personnel.cin || '',
            sexe: personnel.sexe,
            codSit: personnel.codSit || '',
            datSit: personnel.datSit ? new Date(personnel.datSit) : null,
            chefFam: personnel.chefFam || '',
            nbreEnf: personnel.nbreEnf || null,
            chargEnf: personnel.chargEnf || '',
            chargAll: personnel.chargAll || '',
            fctFam: personnel.fctFam || '',
            datEnt: personnel.datEnt ? new Date(personnel.datEnt) : null,
            datTit: personnel.datTit ? new Date(personnel.datTit) : null,
            codFonct: personnel.codFonct || '',
            codCateg: personnel.codCateg || '',
            codCat: personnel.codCat || '',
            codGrad: personnel.codGrad || '',
            codMotif: personnel.codMotif || '',
            codNatp: personnel.codNatp || '',
            codStat: personnel.codStat || '',
            datServ: personnel.datServ ? new Date(personnel.datServ) : null,
            datFonct: personnel.datFonct ? new Date(personnel.datFonct) : null,
            datQualf: personnel.datQualf ? new Date(personnel.datQualf) : null,
            datCateg: personnel.datCateg ? new Date(personnel.datCateg) : null,
            datCat: personnel.datCat ? new Date(personnel.datCat) : null,
            datGrad: personnel.datGrad ? new Date(personnel.datGrad) : null,
            datEch: personnel.datEch ? new Date(personnel.datEch) : null,
            datEmb: personnel.datEmb ? new Date(personnel.datEmb) : null,
            datMotif: personnel.datMotif ? new Date(personnel.datMotif) : null,
            datNais: personnel.datNais ? new Date(personnel.datNais) : null,
            etatAct: personnel.etatAct || '',
            serviceCodServ: personnel.service?.id.codServ || ''
          });
        },
        error: (err) => {
          this.errorMessage = 'Failed to load personnel data.';
          console.error('Error loading personnel:', err);
        }
      });
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.personnelForm.valid) {
      const formValue = this.personnelForm.value;
      const selectedService = this.services.find(s => s.id.codServ === formValue.serviceCodServ);
      const personnel: Personnel = {
        id: {
          codSoc: formValue.codSoc,
          matPers: formValue.matPers,
          codServ: selectedService?.id.codServ || ''
        },
        nomPers: formValue.nomPers,
        prenPers: formValue.prenPers,
        nomPersA: formValue.nomPersA || null,
        prenPersA: formValue.prenPersA || null,
        nomJf: formValue.nomJf || null,
        nomJfA: formValue.nomJfA || null,
        cin: formValue.cin || null,
        sexe: formValue.sexe,
        codSit: formValue.codSit || null,
        datSit: formValue.datSit ? new Date(formValue.datSit).toISOString().split('T')[0] : null,
        chefFam: formValue.chefFam || null,
        nbreEnf: formValue.nbreEnf || null,
        chargEnf: formValue.chargEnf || null,
        chargAll: formValue.chargAll || null,
        fctFam: formValue.fctFam || null,
        datEnt: formValue.datEnt ? new Date(formValue.datEnt).toISOString().split('T')[0] : null,
        datTit: formValue.datTit ? new Date(formValue.datTit).toISOString().split('T')[0] : null,
        codFonct: formValue.codFonct || null,
        codCateg: formValue.codCateg || null,
        codCat: formValue.codCat || null,
        codGrad: formValue.codGrad || null,
        codMotif: formValue.codMotif || null,
        codNatp: formValue.codNatp || null,
        codStat: formValue.codStat || null,
        datServ: formValue.datServ ? new Date(formValue.datServ).toISOString().split('T')[0] : null,
        datFonct: formValue.datFonct ? new Date(formValue.datFonct).toISOString().split('T')[0] : null,
        datQualf: formValue.datQualf ? new Date(formValue.datQualf).toISOString().split('T')[0] : null,
        datCateg: formValue.datCateg ? new Date(formValue.datCateg).toISOString().split('T')[0] : null,
        datCat: formValue.datCat ? new Date(formValue.datCat).toISOString().split('T')[0] : null,
        datGrad: formValue.datGrad ? new Date(formValue.datGrad).toISOString().split('T')[0] : null,
        datEch: formValue.datEch ? new Date(formValue.datEch).toISOString().split('T')[0] : null,
        datEmb: formValue.datEmb ? new Date(formValue.datEmb).toISOString().split('T')[0] : null,
        datMotif: formValue.datMotif ? new Date(formValue.datMotif).toISOString().split('T')[0] : null,
        datNais: formValue.datNais ? new Date(formValue.datNais).toISOString().split('T')[0] : null,
        etatAct: formValue.etatAct || null,
        service: selectedService ? { id: { codSoc: selectedService.id.codSoc, codServ: selectedService.id.codServ }, libServ: selectedService.libServ } : undefined
      };

      const request = this.isEdit
        ? this.personnelService.update(personnel)
        : this.personnelService.create(personnel);

      request.subscribe({
        next: () => {
          this.router.navigate(['/personnels']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to save personnel.';
          console.error('Error saving personnel:', err);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/personnels']);
  }
}