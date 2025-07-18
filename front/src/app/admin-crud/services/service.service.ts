import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceE, ServiceId } from '../models/service.model';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) { }

private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token'); // or your auth service
  return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });
}

  getAll(): Observable<ServiceE[]> {
  return this.http.get<ServiceE[]>(this.apiUrl, { headers: this.getHeaders() });
}

  getById(id: ServiceId): Observable<ServiceE> {
    return this.http.get<ServiceE>(`${this.apiUrl}/${id.codSoc}/${id.codServ}`);
  }

  create(service: ServiceE): Observable<ServiceE> {
    return this.http.post<ServiceE>(this.apiUrl, service);
  }

  update(service: ServiceE): Observable<ServiceE> {
    return this.http.put<ServiceE>(this.apiUrl, service);
  }

  delete(id: ServiceId): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id.codSoc}/${id.codServ}`);
  }
}