import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importation correcte
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-personnel-login',
  templateUrl: './personnel-login.component.html',
  styleUrls: ['./personnel-login.component.css']
})
export class PersonnelLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, // Injection correcte du Router
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      cin: ['', Validators.required],
      matPers: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { cin, matPers } = this.loginForm.value;
      this.authService.signInPersonnel(cin, matPers).subscribe({
        next: (personnel) => {
          this.router.navigate(['/personnel/dashboard']);
        },
        error: () => {
          this.snackBar.open('CIN ou matricule incorrect', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  navigateToAdminLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}