import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DailyActivityService } from '../../services/daily-activity.service';
import { ChildService } from '../../services/child.service';
import { DailyActivity, ActivityTypes, MoodTypes } from '../../models/daily-activity.model';
import { Child } from '../../models/child.model';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  activities: DailyActivity[] = [];
  filteredActivities: DailyActivity[] = [];
  children: Child[] = [];
  activityTypes = ActivityTypes;
  moodTypes = MoodTypes;
  
  selectedDate: string = new Date().toISOString().split('T')[0];
  selectedChild: number = 0;
  isLoading = true;
  showModal = false;
  isEditMode = false;
  
  currentActivity: DailyActivity = this.getEmptyActivity();

  constructor(
    private activityService: DailyActivityService,
    private childService: ChildService
  ) {}

  ngOnInit(): void {
    this.loadActivities();
    this.loadChildren();
  }

  loadActivities(): void {
    this.isLoading = true;
    this.activityService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
        this.filteredActivities = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading activities:', error);
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

  filterActivities(): void {
    let filtered = this.activities;

    if (this.selectedDate) {
      filtered = filtered.filter(activity => {
        const activityDate = new Date(activity.activityTime).toISOString().split('T')[0];
        return activityDate === this.selectedDate;
      });
    }

    if (this.selectedChild > 0) {
      filtered = filtered.filter(activity => activity.childId === this.selectedChild);
    }

    this.filteredActivities = filtered;
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentActivity = this.getEmptyActivity();
    this.showModal = true;
  }

  openEditModal(activity: DailyActivity): void {
    this.isEditMode = true;
    this.currentActivity = { ...activity };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentActivity = this.getEmptyActivity();
  }

  saveActivity(): void {
    // Convert childId to number (HTML select returns string)
    this.currentActivity.childId = Number(this.currentActivity.childId);

    // Validate childId
    if (!this.currentActivity.childId || this.currentActivity.childId === 0) {
      alert('Please select a child');
      return;
    }

    // Remove child navigation property before sending to API
    const activityData = { ...this.currentActivity };
    delete activityData.child;

    if (this.isEditMode && this.currentActivity.id) {
      this.activityService.updateActivity(this.currentActivity.id, activityData).subscribe({
        next: () => {
          this.loadActivities();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating activity:', error);
          const errorMessage = error.error?.message || error.error?.title || 'Error updating activity';
          alert(errorMessage);
        }
      });
    } else {
      this.activityService.createActivity(activityData).subscribe({
        next: () => {
          this.loadActivities();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating activity:', error);
          const errorMessage = error.error?.message || error.error?.title || 'Error creating activity';
          alert(errorMessage);
        }
      });
    }
  }

  deleteActivity(id: number): void {
    if (confirm('Are you sure you want to delete this activity?')) {
      this.activityService.deleteActivity(id).subscribe({
        next: () => this.loadActivities(),
        error: (error) => console.error('Error deleting activity:', error)
      });
    }
  }

  private getEmptyActivity(): DailyActivity {
    return {
      childId: 0,
      activityType: '',
      activityTime: new Date().toISOString().slice(0, 16),
      duration: '',
      notes: '',
      foodItem: '',
      mood: ''
    };
  }
}