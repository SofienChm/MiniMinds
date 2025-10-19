import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { Teacher, CreateTeacher } from '../../models/teacher.model';
import { TitlepageComponent, Breadcrumb, TitleAction } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule, TitlepageComponent],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'bi bi-house' },
    { label: 'Teachers', icon: 'bi bi-person-workspace' }
  ];
  
  titleActions: TitleAction[] = [
    {
      label: 'Add Teacher',
      icon: 'bi bi-plus-circle',
      class: 'btn btn-primary',
      action: () => this.openAddModal()
    }
  ];

  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  searchTerm = '';
  isLoading = true;
  showModal = false;
  isEditMode = false;
  
  currentTeacher: CreateTeacher & { id?: number } = this.getEmptyTeacher();

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe({
      next: (data) => {
        this.teachers = data;
        this.filteredTeachers = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading teachers:', error);
        this.isLoading = false;
      }
    });
  }

  searchTeachers(): void {
    if (!this.searchTerm) {
      this.filteredTeachers = this.teachers;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredTeachers = this.teachers.filter(teacher =>
      teacher.firstName.toLowerCase().includes(term) ||
      teacher.lastName.toLowerCase().includes(term) ||
      teacher.email.toLowerCase().includes(term) ||
      (teacher.specialization && teacher.specialization.toLowerCase().includes(term))
    );
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.currentTeacher = this.getEmptyTeacher();
    this.showModal = true;
  }

  openEditModal(teacher: Teacher): void {
    this.isEditMode = true;
    this.currentTeacher = {
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: teacher.email,
      phone: teacher.phone,
      address: teacher.address,
      dateOfBirth: new Date(teacher.dateOfBirth),
      hireDate: new Date(teacher.hireDate),
      specialization: teacher.specialization,
      salary: teacher.salary,
      profilePicture: teacher.profilePicture,
      password: ''
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.currentTeacher = this.getEmptyTeacher();
  }

  saveTeacher(): void {
    if (this.isEditMode && this.currentTeacher.id) {
      const { password, ...updateData } = this.currentTeacher;
      this.teacherService.updateTeacher(this.currentTeacher.id, updateData as any).subscribe({
        next: () => {
          this.loadTeachers();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating teacher:', error);
          alert('Error updating teacher');
        }
      });
    } else {
      this.teacherService.createTeacher(this.currentTeacher).subscribe({
        next: () => {
          this.loadTeachers();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating teacher:', error);
          alert('Error creating teacher');
        }
      });
    }
  }

  deleteTeacher(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teacherService.deleteTeacher(id).subscribe({
        next: () => this.loadTeachers(),
        error: (error) => console.error('Error deleting teacher:', error)
      });
    }
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  private getEmptyTeacher(): CreateTeacher & { id?: number } {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: new Date(),
      hireDate: new Date(),
      specialization: '',
      salary: 0,
      profilePicture: '',
      password: ''
    };
  }
}