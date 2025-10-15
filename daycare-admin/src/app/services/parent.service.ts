import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parent } from '../models/parent.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private apiUrl = `${environment.apiUrl}/parents`;

  constructor(private http: HttpClient) {}

  getParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.apiUrl);
  }

  getParent(id: number): Observable<Parent> {
    return this.http.get<Parent>(`${this.apiUrl}/${id}`);
  }

  createParent(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(this.apiUrl, parent);
  }

  updateParent(id: number, parent: Parent): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, parent);
  }

  deleteParent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}