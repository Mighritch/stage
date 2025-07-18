import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Connexion Admin</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field>
              <input matInput placeholder="CIN" formControlName="cin" required>
              <mat-error *ngIf="loginForm.get('cin')?.hasError('required')">
                CIN est requis
              </mat-error>
            </mat-form-field>
            <mat-form-field>
              <input matInput type="password" placeholder="Mot de passe" formControlName="password" required>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Mot de passe est requis
              </mat-error>
            </mat-form-field>
            <div class="actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
                Se connecter
              </button>
              <button mat-button color="accent" type="button" (click)="navigateToSignUp()">
                Créer un compte
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      padding: 50px;
    }
    mat-card {
      width: 400px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      cin: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { cin, password } = this.loginForm.value;
      this.authService.signIn(cin, password).subscribe({
        next: () => {
          this.router.navigate(['/admin/personnels']);
        },
        error: () => {
          alert('Identifiants incorrects');
        }
      });
    }
  }

  navigateToSignUp(): void {
    this.router.navigate(['/auth/signup']);
  }
}