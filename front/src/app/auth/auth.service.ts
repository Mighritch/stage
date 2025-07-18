import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Admin } from '../auth/models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentAdminKey = 'currentAdmin';

  constructor(private http: HttpClient) { }

  signUp(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, adminData);
  }

  signIn(cin: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/signin`, { cin, password }).pipe(
      tap(admin => {
        if (admin) {
          localStorage.setItem(this.currentAdminKey, JSON.stringify(admin));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.currentAdminKey);
  }

  getCurrentAdmin(): Admin | null {
    const adminStr = localStorage.getItem(this.currentAdminKey);
    return adminStr ? JSON.parse(adminStr) : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentAdmin() !== null;
  }
}