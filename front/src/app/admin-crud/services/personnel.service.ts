import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Personnel, PersonnelId } from '../models/personnel.models';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {
  private apiUrl = 'http://localhost:8080/api/personnels';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.apiUrl).pipe(
        catchError(() => of([])) // Retourne un tableau vide en cas d’erreur
    );
  }

  getById(id: PersonnelId): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.apiUrl}/${id.codSoc}/${id.matPers}`);
  }

  create(personnel: Personnel): Observable<Personnel> {
    return this.http.post<Personnel>(this.apiUrl, personnel);
  }

  update(personnel: Personnel): Observable<Personnel> {
    return this.http.put<Personnel>(this.apiUrl, personnel);
  }

  delete(id: PersonnelId): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id.codSoc}/${id.matPers}`);
  }

  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/pdf`, { 
      responseType: 'blob' 
    });
  }
}
