import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItemsDashboard = [
    { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/activities', icon: 'bi-activity', label: 'Daily Activities' },
    { path: '/attendance', icon: 'bi-calendar-check', label: 'Attendance' }
  ];
  menuItemsPeople = [
    { path: '/parents', icon: 'bi-people', label: 'Parents' },
    { path: '/children', icon: 'bi-person-hearts', label: 'Children' },
  ];
}