import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { AuthResponse } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: AuthResponse | null = null;
  unreadCount = 0;
  showNotifications = false;
  notifications: any[] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });

    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getUnreadNotifications().subscribe(
      notifications => {
        this.notifications = notifications;
      }
    );
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadNotifications();
    }
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.loadNotifications();
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe(() => {
      this.loadNotifications();
    });
  }

  logout(): void {
    this.authService.logout();
  }

  getInitials(): string {
    if (!this.currentUser) return '';
    return `${this.currentUser.firstName.charAt(0)}${this.currentUser.lastName.charAt(0)}`.toUpperCase();
  }
}