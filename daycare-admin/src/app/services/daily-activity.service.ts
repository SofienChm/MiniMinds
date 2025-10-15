import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyActivity } from '../models/daily-activity.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DailyActivityService {
  private apiUrl = `${environment.apiUrl}/dailyactivities`;

  constructor(private http: HttpClient) {}

  getActivities(): Observable<DailyActivity[]> {
    return this.http.get<DailyActivity[]>(this.apiUrl);
  }

  getActivity(id: number): Observable<DailyActivity> {
    return this.http.get<DailyActivity>(`${this.apiUrl}/${id}`);
  }

  getActivitiesByChild(childId: number): Observable<DailyActivity[]> {
    return this.http.get<DailyActivity[]>(`${this.apiUrl}/ByChild/${childId}`);
  }

  getActivitiesByDate(date: string): Observable<DailyActivity[]> {
    return this.http.get<DailyActivity[]>(`${this.apiUrl}/ByDate?date=${date}`);
  }

  createActivity(activity: DailyActivity): Observable<DailyActivity> {
    return this.http.post<DailyActivity>(this.apiUrl, activity);
  }

  updateActivity(id: number, activity: DailyActivity): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, activity);
  }

  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}