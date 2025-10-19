import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { ChildService } from '../../services/child.service';
import { Program } from '../../models/program.model';
import { Child } from '../../models/child.model';
import { TitlepageComponent, Breadcrumb, TitleAction } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, FormsModule, TitlepageComponent],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'bi bi-house' },
    { label: 'Programs', icon: 'bi bi-calendar-event' }
  ];
  
  titleActions: TitleAction[] = [
    {
      label: 'Add Program',
      icon: 'bi bi-plus-circle',
      class: 'btn btn-primary',
      action: () => this.openAddModal()
    }
  ];

  programs: Program[] = [];
  filteredPrograms: Program[] = [];
  children: Child[] = [];
  availableChildren: Child[] = [];
  searchTerm = '';
  isLoading = true;
  showModal = false;
  showEnrollmentModal = false;
  isEditMode = false;
  
  currentProgram: Program = this.getEmptyProgram();
  selectedProgram: Program | null = null;

  constructor(
    private programService: ProgramService,
    private childService: ChildService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPrograms();
    this.loadChildren();
  }

  loadPrograms(): void {
    this.isLoading = true;
    this.programService.getPrograms().subscribe({
      next: (data) => {
        this.programs = data;
        this.filteredPrograms = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading programs:', error);
        this.isLoading = false;
      }
    });
  }

  loadChildren(): void {
    this.childService.getChildren().subscribe({
      next: (data) => {
        this.children = data;
      },
      error: (error) => {
        console.error('Error loading children:', error);
      }
    });
  }

  searchPrograms(): void {
    if (!this.searchTerm) {
      this.filteredPrograms = this.programs;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredPrograms = this.programs.filter(program =>
      program.title.toLowerCase().includes(term) ||
      (program.description && program.description.toLowerCase().includes(term))
    );
  }

  openAddModal(): void {
    console.log('Navigating to add program');
    this.router.navigate(['/programs/add']);
  }

  openEditModal(program: Program): void {
    console.log('Navigating to edit program:', program.id);
    this.router.navigate(['/programs/edit', program.id]);
  }

  closeModal(): void {
    this.showModal = false;
    this.currentProgram = this.getEmptyProgram();
  }

  openEnrollmentModal(program: Program): void {
    this.selectedProgram = program;
    this.updateAvailableChildren();
    this.showEnrollmentModal = true;
  }

  closeEnrollmentModal(): void {
    this.showEnrollmentModal = false;
    this.selectedProgram = null;
  }

  updateAvailableChildren(): void {
    if (!this.selectedProgram) return;

    const enrolledChildIds = this.selectedProgram.enrollments?.map(e => e.childId) || [];
    this.availableChildren = this.children.filter(child => {
      const age = this.calculateAge(child.dateOfBirth);
      const isAgeEligible = age >= this.selectedProgram!.minAge && age <= this.selectedProgram!.maxAge;
      const isNotEnrolled = !enrolledChildIds.includes(child.id!);
      return isAgeEligible && isNotEnrolled;
    });
  }

  saveProgram(): void {
    // Format the program data for API
    const programData = {
      ...this.currentProgram,
      date: new Date(this.currentProgram.date).toISOString().split('T')[0],
      startTime: this.currentProgram.startTime,
      endTime: this.currentProgram.endTime
    };

    if (this.isEditMode && this.currentProgram.id) {
      this.programService.updateProgram(this.currentProgram.id, programData as any).subscribe({
        next: () => {
          this.loadPrograms();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating program:', error);
          alert('Error updating program');
        }
      });
    } else {
      this.programService.createProgram(programData as any).subscribe({
        next: () => {
          this.loadPrograms();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating program:', error);
          alert('Error creating program');
        }
      });
    }
  }

  deleteProgram(id: number): void {
    if (confirm('Are you sure you want to delete this program?')) {
      this.programService.deleteProgram(id).subscribe({
        next: () => this.loadPrograms(),
        error: (error) => console.error('Error deleting program:', error)
      });
    }
  }

  enrollChild(childId: number | undefined): void {
    if (!this.selectedProgram?.id || !childId) return;

    this.programService.enrollChild(this.selectedProgram.id, childId).subscribe({
      next: () => {
        this.loadPrograms();
        this.updateAvailableChildren();
      },
      error: (error) => {
        console.error('Error enrolling child:', error);
        alert('Error enrolling child: ' + (error.error?.message || 'Unknown error'));
      }
    });
  }

  unenrollChild(childId: number): void {
    if (!this.selectedProgram?.id) return;

    this.programService.unenrollChild(this.selectedProgram.id, childId).subscribe({
      next: () => {
        this.loadPrograms();
        this.updateAvailableChildren();
      },
      error: (error) => {
        console.error('Error unenrolling child:', error);
        alert('Error unenrolling child');
      }
    });
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

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }

  private getEmptyProgram(): Program {
    const today = new Date();
    return {
      title: '',
      description: '',
      capacity: 10,
      minAge: 2,
      maxAge: 5,
      date: today,
      startTime: '09:00',
      endTime: '11:00'
    };
  }
}