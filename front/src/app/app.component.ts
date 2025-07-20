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

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isPersonnel(): boolean {
    return this.authService.isPersonnel();
  }

  getUsername(): string {
    const admin = this.authService.getCurrentAdmin();
    if (admin) {
      return `${admin.prenom} ${admin.nom}`;
    }
    
    const personnel = this.authService.getCurrentPersonnel();
    if (personnel) {
      return `${personnel.prenPers} ${personnel.nomPers}`;
    }
    
    return '';
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }
}