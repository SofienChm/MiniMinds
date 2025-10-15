import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  getAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  getAttendance(id: number): Observable<Attendance> {
    return this.http.get<Attendance>(`${this.apiUrl}/${id}`);
  }

  getAttendanceByChild(childId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/ByChild/${childId}`);
  }

  getAttendanceByDate(date: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/ByDate?date=${date}`);
  }

  getTodayAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/Today`);
  }

  checkIn(attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/CheckIn`, attendance);
  }

  checkOut(id: number, notes?: string): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/CheckOut/${id}`, notes);
  }

  updateAttendance(id: number, attendance: Attendance): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, attendance);
  }

  deleteAttendance(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}