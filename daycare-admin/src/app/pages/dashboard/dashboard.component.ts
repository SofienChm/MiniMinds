import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentService } from '../../services/parent.service';
import { ChildService } from '../../services/child.service';
import { AttendanceService } from '../../services/attendance.service';
import { TitlepageComponent, Breadcrumb } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TitlepageComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', icon: 'bi bi-house' }
  ];

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
    let loadedCount = 0;
    const totalLoads = 3;

    const checkComplete = () => {
      loadedCount++;
      if (loadedCount >= totalLoads) {
        this.isLoading = false;
      }
    };

    this.parentService.getParents().subscribe({
      next: (parents) => {
        this.stats.totalParents = parents.length;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading parents:', error);
        checkComplete();
      }
    });

    this.childService.getChildren().subscribe({
      next: (children) => {
        this.stats.totalChildren = children.length;
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading children:', error);
        checkComplete();
      }
    });

    // Use today's date for attendance
    const today = new Date().toISOString().split('T')[0];
    this.attendanceService.getAttendanceByDate(today).subscribe({
      next: (attendance) => {
        this.stats.checkedInToday = attendance.length;
        this.stats.checkedOutToday = attendance.filter(a => a.checkOutTime).length;
        this.recentAttendance = attendance.slice(0, 5);
        checkComplete();
      },
      error: (error) => {
        console.error('Error loading attendance:', error);
        this.stats.checkedInToday = 0;
        this.stats.checkedOutToday = 0;
        this.recentAttendance = [];
        checkComplete();
      }
    });
  }
}