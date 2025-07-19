import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Personnel, PersonnelId } from '../models/personnel.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private apiUrl = 'http://localhost:8080/api/personnels';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assume token is stored after login
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Use 'Bearer' if using JWT
    });
  }

  getAll(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: PersonnelId): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.apiUrl}/${id.codSoc}/${id.matPers}`, { headers: this.getHeaders() });
  }

  create(personnel: Personnel): Observable<Personnel> {
    return this.http.post<Personnel>(this.apiUrl, personnel, { headers: this.getHeaders() });
  }

  update(personnel: Personnel): Observable<Personnel> {
    return this.http.put<Personnel>(this.apiUrl, personnel, { headers: this.getHeaders() });
  }

  delete(id: PersonnelId): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id.codSoc}/${id.matPers}`, { headers: this.getHeaders() });
  }

  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/pdf`, { 
      responseType: 'blob',
      headers: this.getHeaders()
    });
  }
}