import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child } from '../models/child.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  private apiUrl = `${environment.apiUrl}/children`;

  constructor(private http: HttpClient) {}

  getChildren(): Observable<Child[]> {
    return this.http.get<Child[]>(this.apiUrl);
  }

  getChild(id: number): Observable<Child> {
    return this.http.get<Child>(`${this.apiUrl}/${id}`);
  }

  getChildrenByParent(parentId: number): Observable<Child[]> {
    return this.http.get<Child[]>(`${this.apiUrl}/ByParent/${parentId}`);
  }

  createChild(child: Child): Observable<Child> {
    return this.http.post<Child>(this.apiUrl, child);
  }

  updateChild(id: number, child: Child): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, child);
  }

  deleteChild(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}