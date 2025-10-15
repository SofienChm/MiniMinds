import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent.model';

@Component({
  selector: 'app-parents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {
  parents: Parent[] = [];
  filteredParents: Parent[] = [];
  searchTerm = '';
  isLoading = true;
  showModal = false;
  isEditMode = false;
  
  currentParent: Parent = this.getEmptyParent();

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.isLoading = true;
    this.parentService.getParents().subscribe({
      next: (data) => {
        this.parents = data;
        this.filteredParents = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading parents:', error);
        this.isLoading = false;
      }
    });
  }

  searchParents(): void {
    if (!this.searchTerm) {
      this.filteredParents = this.parents;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredParents = this.parents.filter(parent =>
      parent.firstName.toLowerCase().includes(term) ||
      parent.lastName.toLowerCase().includes(term) ||
      parent.email.toLowerCase().includes(term) ||
      parent.phoneNumber.includes(term)
    );
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentParent = this.getEmptyParent();
    this.showModal = true;
  }

  openEditModal(parent: Parent): void {
    this.isEditMode = true;
    this.currentParent = { ...parent };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentParent = this.getEmptyParent();
  }

  saveParent(): void {
    if (this.isEditMode && this.currentParent.id) {
      this.parentService.updateParent(this.currentParent.id, this.currentParent).subscribe({
        next: () => {
          this.loadParents();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating parent:', error);
          const errorMessage = error.error?.message || error.error?.title || 'Error updating parent';
          alert(errorMessage);
        }
      });
    } else {
      this.parentService.createParent(this.currentParent).subscribe({
        next: () => {
          this.loadParents();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating parent:', error);
          const errorMessage = error.error?.message || error.error?.title || 'Error creating parent';
          alert(errorMessage);
        }
      });
    }
  }

  deleteParent(id: number): void {
    if (confirm('Are you sure you want to delete this parent?')) {
      this.parentService.deleteParent(id).subscribe({
        next: () => this.loadParents(),
        error: (error) => console.error('Error deleting parent:', error)
      });
    }
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
        this.currentParent.profilePicture = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.currentParent.profilePicture = undefined;
  }

  private getEmptyParent(): Parent {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      emergencyContact: ''
    };
  }
}