import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';
import { ChildService } from '../../services/child.service';
import { Attendance } from '../../models/attendance.model';
import { Child } from '../../models/child.model';
import { TitlepageComponent, Breadcrumb, TitleAction } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, TitlepageComponent],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'bi bi-house' },
    { label: 'Attendance', icon: 'bi bi-clipboard-check' }
  ];
  
  titleActions: TitleAction[] = [
    {
      label: 'Check In Child',
      icon: 'bi bi-box-arrow-in-right',
      class: 'btn btn-primary',
      action: () => this.openCheckInModal()
    }
  ];

  attendances: Attendance[] = [];
  children: Child[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0];
  isLoading = true;
  showCheckInModal = false;
  
  checkInData: Attendance = this.getEmptyAttendance();

  constructor(
    private attendanceService: AttendanceService,
    private childService: ChildService
  ) {}

  ngOnInit(): void {
    this.loadAttendances();
    this.loadChildren();
  }

  loadAttendances(): void {
    this.isLoading = true;
    this.attendanceService.getAttendanceByDate(this.selectedDate).subscribe({
      next: (data) => {
        this.attendances = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading attendances:', error);
        this.isLoading = false;
      }
    });
  }

  loadChildren(): void {
    this.childService.getChildren().subscribe({
      next: (data) => {
        this.children = data;
      },
      error: (error) => console.error('Error loading children:', error)
    });
  }

  onDateChange(): void {
    this.loadAttendances();
  }

  openCheckInModal(): void {
    this.checkInData = this.getEmptyAttendance();
    this.showCheckInModal = true;
  }

  closeCheckInModal(): void {
    this.showCheckInModal = false;
    this.checkInData = this.getEmptyAttendance();
  }

  checkIn(): void {
    // Convert childId to number (HTML select returns string)
    this.checkInData.childId = Number(this.checkInData.childId);

    // Validate childId
    if (!this.checkInData.childId || this.checkInData.childId === 0) {
      alert('Please select a child');
      return;
    }

    // Remove child navigation property before sending to API
    const attendanceData = { ...this.checkInData };
    delete attendanceData.child;

    this.attendanceService.checkIn(attendanceData).subscribe({
      next: () => {
        this.loadAttendances();
        this.closeCheckInModal();
      },
      error: (error) => {
        console.error('Error checking in:', error);
        const errorMessage = error.error?.message || error.error?.title || 'Error checking in child';
        alert(errorMessage);
      }
    });
  }

  checkOut(attendance: Attendance): void {
    if (confirm('Are you sure you want to check out this child?')) {
      const notes = prompt('Check-out notes (optional):');
      this.attendanceService.checkOut(attendance.id!, notes || '').subscribe({
        next: () => {
          this.loadAttendances();
        },
        error: (error) => {
          console.error('Error checking out:', error);
          alert(error.error?.message || 'Error checking out child');
        }
      });
    }
  }

  deleteAttendance(id: number): void {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      this.attendanceService.deleteAttendance(id).subscribe({
        next: () => this.loadAttendances(),
        error: (error) => console.error('Error deleting attendance:', error)
      });
    }
  }

  getAvailableChildren(): Child[] {
    const checkedInChildIds = this.attendances
      .filter(a => !a.checkOutTime)
      .map(a => a.childId);
    return this.children.filter(c => !checkedInChildIds.includes(c.id!));
  }

  getCheckedInCount(): number {
    return this.attendances.filter(a => !a.checkOutTime).length;
  }

  getCheckedOutCount(): number {
    return this.attendances.filter(a => a.checkOutTime).length;
  }

  private getEmptyAttendance(): Attendance {
    return {
      childId: 0,
      checkInTime: new Date().toISOString(),
      date: new Date().toISOString(),
      checkInNotes: ''
    };
  }
}