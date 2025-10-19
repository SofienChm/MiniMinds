import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItemsDashboard: any[] = [];
  menuItemsPeople: any[] = [];
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.setupMenuItems();
  }

  private setupMenuItems(): void {
    // Dashboard items - available to all roles
    this.menuItemsDashboard = [
      { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
      { path: '/activities', icon: 'bi-activity', label: 'Daily Activities' },
      { path: '/attendance', icon: 'bi-calendar-check', label: 'Attendance' },
      { path: '/programs', icon: 'bi-calendar-event', label: 'Programs' },
      { path: '/messages', icon: 'bi-envelope', label: 'Messages' }
    ];

    // People items - role-based
    this.menuItemsPeople = [
      { path: '/children', icon: 'bi-person-hearts', label: 'Children' }
    ];

    // Add role-specific menu items
    if (this.authService.isAdmin()) {
      this.menuItemsPeople.unshift(
        { path: '/parents', icon: 'bi-people', label: 'Parents' },
        { path: '/teachers', icon: 'bi-person-workspace', label: 'Teachers' }
      );
    } else if (this.authService.isTeacher()) {
      this.menuItemsPeople.unshift(
        { path: '/parents', icon: 'bi-people', label: 'Parents' }
      );
    }
    // Parents only see children (already added above)
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isParent(): boolean {
    return this.authService.isParent();
  }

  isTeacher(): boolean {
    return this.authService.isTeacher();
  }
}