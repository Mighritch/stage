import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      cin: ['', [Validators.required, Validators.minLength(8)]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { cin, nom, prenom, password } = this.signupForm.value;
      this.authService.signUp({ cin, nom, prenom, password }).subscribe({
        next: () => {
          this.snackBar.open('Inscription réussie!', 'Fermer', { duration: 3000 });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.snackBar.open(
            err.error?.message || 'Erreur lors de l\'inscription', 
            'Fermer', 
            { duration: 3000 }
          );
        }
      });
    }
  }
}