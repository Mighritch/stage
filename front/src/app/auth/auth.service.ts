import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Admin } from '../auth/models/admin.model';
import { Personnel } from '../admin-crud/models/personnel.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentAdminKey = 'currentAdmin';
  private currentPersonnelKey = 'currentPersonnel';
  private userTypeKey = 'userType';

  constructor(private http: HttpClient) { }

  signUp(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, adminData);
  }

  signIn(cin: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}/signin`, { cin, password }).pipe(
      tap(admin => {
        if (admin) {
          localStorage.setItem(this.currentAdminKey, JSON.stringify(admin));
          localStorage.setItem(this.userTypeKey, 'admin');
        }
      })
    );
  }

  signInPersonnel(cin: string, matPers: string): Observable<Personnel> {
    const body = {
      cin: cin,
      id: { matPers: matPers }
    };
    return this.http.post<Personnel>(`${this.apiUrl}/personnel/signin`, body).pipe(
      tap(personnel => {
        if (personnel) {
          localStorage.setItem(this.currentPersonnelKey, JSON.stringify(personnel));
          localStorage.setItem(this.userTypeKey, 'personnel');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.currentAdminKey);
    localStorage.removeItem(this.currentPersonnelKey);
    localStorage.removeItem(this.userTypeKey);
  }

  getCurrentAdmin(): Admin | null {
    const adminStr = localStorage.getItem(this.currentAdminKey);
    return adminStr ? JSON.parse(adminStr) : null;
  }

  getCurrentPersonnel(): Personnel | null {
    const personnelStr = localStorage.getItem(this.currentPersonnelKey);
    return personnelStr ? JSON.parse(personnelStr) : null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentAdmin() !== null || this.getCurrentPersonnel() !== null;
  }

  isAdmin(): boolean {
    return this.getCurrentAdmin() !== null;
  }

  isPersonnel(): boolean {
    return this.getCurrentPersonnel() !== null;
  }
}