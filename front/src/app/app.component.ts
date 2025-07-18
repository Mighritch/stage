import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getUsername(): string {
    const admin = this.authService.getCurrentAdmin();
    return admin ? `${admin.prenom} ${admin.nom}` : '';
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}