import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ServiceE, ServiceId } from '../../models/service.model';

@Component({
  selector: 'app-service-form',
  template: `
    <h2>{{ isEdit ? 'Edit Service' : 'Add Service' }}</h2>
    <form [formGroup]="serviceForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <input matInput placeholder="Company Code" formControlName="codSoc" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Service Code" formControlName="codServ" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Service Name" formControlName="libServ" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Abbreviation" formControlName="abrServ" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Service Type" formControlName="typeServ" required>
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="Arabic Service Name" formControlName="libServA">
      </mat-form-field>
      <div>
        <button mat-raised-button color="primary" type="submit" [disabled]="serviceForm.invalid">Save</button>
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
  `]
})
export class ServiceFormComponent implements OnInit {
  serviceForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.serviceForm = this.fb.group({
      codSoc: ['', Validators.required],
      codServ: ['', Validators.required],
      libServ: ['', Validators.required],
      abrServ: ['', Validators.required],
      typeServ: ['', Validators.required],
      libServA: ['']
    });
  }

  ngOnInit(): void {
    const codSoc = this.route.snapshot.paramMap.get('codSoc');
    const codServ = this.route.snapshot.paramMap.get('codServ');
    if (codSoc && codServ) {
      this.isEdit = true;
      this.serviceService.getById({ codSoc, codServ }).subscribe(service => {
        this.serviceForm.patchValue(service);
      });
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const formValue = this.serviceForm.value;
      const service: ServiceE = {
        id: { codSoc: formValue.codSoc, codServ: formValue.codServ },
        libServ: formValue.libServ,
        abrServ: formValue.abrServ,
        typeServ: formValue.typeServ,
        libServA: formValue.libServA
      };

      const request = this.isEdit
        ? this.serviceService.update(service)
        : this.serviceService.create(service);

      request.subscribe(() => {
        this.router.navigate(['/admin/services']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/services']);
  }
}