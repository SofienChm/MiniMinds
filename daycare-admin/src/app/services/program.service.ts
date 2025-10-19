import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Program } from '../models/program.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = `${environment.apiUrl}/programs`;

  constructor(private http: HttpClient) {}

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(this.apiUrl);
  }

  getProgram(id: number): Observable<Program> {
    return this.http.get<Program>(`${this.apiUrl}/${id}`);
  }

  createProgram(program: Program): Observable<Program> {
    return this.http.post<Program>(this.apiUrl, program);
  }

  updateProgram(id: number, program: Program): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, program);
  }

  deleteProgram(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  enrollChild(programId: number, childId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${programId}/enroll/${childId}`, {});
  }

  unenrollChild(programId: number, childId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${programId}/unenroll/${childId}`);
  }
}