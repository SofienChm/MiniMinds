import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChildService } from '../../services/child.service';
import { ParentService } from '../../services/parent.service';
import { Child } from '../../models/child.model';
import { Parent } from '../../models/parent.model';
import { TitlepageComponent, Breadcrumb, TitleAction } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-children',
  standalone: true,
  imports: [CommonModule, FormsModule, TitlepageComponent,  ],
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

  children: Child[] = [];
  filteredChildren: Child[] = [];
  parents: Parent[] = [];
  searchTerm = '';
  isLoading = true;
  showModal = false;
  isEditMode = false;
  
  // Titlepage configuration
  breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'bi bi-house' },
    { label: 'Children', icon: 'bi bi-people' }
  ];
  
  titleActions: TitleAction[] = [
    {
      label: 'Add Child',
      icon: 'bi bi-plus-circle',
      class: 'btn btn-primary',
      action: () => this.openAddModal()
    }
  ];
  
  // View mode: 'list' or 'grid'
  viewMode: 'list' | 'grid' = 'list';
  
  // Filter options
  filterStartDate: string = '';
  filterEndDate: string = '';
  sortBy: 'name' | 'date' = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  
  currentChild: Child = this.getEmptyChild();

  constructor(
    private childService: ChildService,
    private parentService: ParentService
  ) {}

  ngOnInit(): void {
    this.loadChildren();
    this.loadParents();
  }

  loadChildren(): void {
    this.isLoading = true;
    this.childService.getChildren().subscribe({
      next: (data) => {
        this.children = data;
        this.filteredChildren = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading children:', error);
        this.isLoading = false;
      }
    });
  }

  loadParents(): void {
    this.parentService.getParents().subscribe({
      next: (data) => {
        this.parents = data;
      },
      error: (error) => console.error('Error loading parents:', error)
    });
  }

  searchChildren(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.children];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(child =>
        child.firstName.toLowerCase().includes(term) ||
        child.lastName.toLowerCase().includes(term) ||
        child.parent?.firstName.toLowerCase().includes(term) ||
        child.parent?.lastName.toLowerCase().includes(term)
      );
    }

    // Apply date range filter (enrollment date)
    if (this.filterStartDate) {
      const startDate = new Date(this.filterStartDate);
      result = result.filter(child => {
        const enrollmentDate = child.enrollmentDate ? new Date(child.enrollmentDate) : new Date(child.createdAt!);
        return enrollmentDate >= startDate;
      });
    }

    if (this.filterEndDate) {
      const endDate = new Date(this.filterEndDate);
      endDate.setHours(23, 59, 59, 999); // Include the entire end date
      result = result.filter(child => {
        const enrollmentDate = child.enrollmentDate ? new Date(child.enrollmentDate) : new Date(child.createdAt!);
        return enrollmentDate <= endDate;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (this.sortBy === 'name') {
        const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
        const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
        comparison = nameA.localeCompare(nameB);
      } else if (this.sortBy === 'date') {
        const dateA = a.enrollmentDate ? new Date(a.enrollmentDate).getTime() : new Date(a.createdAt!).getTime();
        const dateB = b.enrollmentDate ? new Date(b.enrollmentDate).getTime() : new Date(b.createdAt!).getTime();
        comparison = dateA - dateB;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    this.filteredChildren = result;
  }

  toggleViewMode(mode: 'list' | 'grid'): void {
    this.viewMode = mode;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.sortBy = 'name';
    this.sortOrder = 'asc';
    this.applyFilters();
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentChild = this.getEmptyChild();
    this.showModal = true;
  }

  openEditModal(child: Child): void {
    this.isEditMode = true;
    this.currentChild = { ...child };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentChild = this.getEmptyChild();
  }

  saveChild(): void {
    // Convert parentId to number (HTML select returns string)
    this.currentChild.parentId = Number(this.currentChild.parentId);

    // Validate parentId
    if (!this.currentChild.parentId || this.currentChild.parentId === 0) {
      alert('Please select a parent');
      return;
    }

    // Validate gender
    if (!this.currentChild.gender) {
      alert('Please select a gender');
      return;
    }

    // Remove parent navigation property before sending to API
    const childData = { ...this.currentChild };
    delete childData.parent;

    if (this.isEditMode && this.currentChild.id) {
      this.childService.updateChild(this.currentChild.id, childData).subscribe({
        next: () => {
          this.loadChildren();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating child:', error);
          const errorMessage = error.error?.message || error.error?.title || 'Error updating child';
          alert(errorMessage);
        }
      });
    } else {
      this.childService.createChild(childData).subscribe({
        next: () => {
          this.loadChildren();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating child:', error);
          const errorMessage = error.error?.message || error.error?.title || 'Error creating child';
          alert(errorMessage);
        }
      });
    }
  }

  deleteChild(id: number): void {
    if (confirm('Are you sure you want to delete this child?')) {
      this.childService.deleteChild(id).subscribe({
        next: () => this.loadChildren(),
        error: (error) => console.error('Error deleting child:', error)
      });
    }
  }

  calculateAge(dateOfBirth: Date | string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentChild.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.currentChild.profilePicture = undefined;
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  private getEmptyChild(): Child {
    return {
      firstName: '',
      lastName: '',
      dateOfBirth: new Date().toISOString().split('T')[0],
      gender: '',
      allergies: '',
      medicalNotes: '',
      parentId: 0,
      enrollmentDate: new Date().toISOString().split('T')[0]
    };
  }

  
}