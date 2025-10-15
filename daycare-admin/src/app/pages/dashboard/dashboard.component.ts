import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentService } from '../../services/parent.service';
import { ChildService } from '../../services/child.service';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalParents: 0,
    totalChildren: 0,
    checkedInToday: 0,
    checkedOutToday: 0
  };

  recentAttendance: any[] = [];
  isLoading = true;

  constructor(
    private parentService: ParentService,
    private childService: ChildService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;

    this.parentService.getParents().subscribe(parents => {
      this.stats.totalParents = parents.length;
    });

    this.childService.getChildren().subscribe(children => {
      this.stats.totalChildren = children.length;
    });

    this.attendanceService.getTodayAttendance().subscribe(attendance => {
      this.stats.checkedInToday = attendance.length;
      this.stats.checkedOutToday = attendance.filter(a => a.checkOutTime).length;
      this.recentAttendance = attendance.slice(0, 5);
      this.isLoading = false;
    });
  }
}