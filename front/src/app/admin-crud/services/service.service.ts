import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceE, ServiceId } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ServiceE[]> {
    return this.http.get<ServiceE[]>(this.apiUrl);
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