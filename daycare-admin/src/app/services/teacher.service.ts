import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher, CreateTeacher } from '../models/teacher.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = `${environment.apiUrl}/teachers`;

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  createTeacher(teacher: CreateTeacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  updateTeacher(id: number, teacher: Partial<Teacher>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, teacher);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}