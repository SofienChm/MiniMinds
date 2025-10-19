import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { ChildService } from '../../services/child.service';
import { Program } from '../../models/program.model';
import { Child } from '../../models/child.model';

@Component({
  selector: 'app-program-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {
  program: Program = this.getEmptyProgram();
  children: Child[] = [];
  availableChildren: Child[] = [];
  isEditMode = false;
  isLoading = false;
  programId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private programService: ProgramService,
    private childService: ChildService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.programId = +params['id'];
        this.isEditMode = true;
        this.loadProgram();
      }
    });
    this.loadChildren();
  }

  loadProgram(): void {
    if (!this.programId) return;
    
    this.programService.getProgram(this.programId).subscribe({
      next: (data) => {
        this.program = data;
        this.updateAvailableChildren();
      },
      error: (error) => {
        console.error('Error loading program:', error);
        alert('Error loading program');
      }
    });
  }

  loadChildren(): void {
    this.childService.getChildren().subscribe({
      next: (data) => {
        this.children = data;
        this.updateAvailableChildren();
      },
      error: (error) => {
        console.error('Error loading children:', error);
      }
    });
  }

  updateAvailableChildren(): void {
    if (!this.program) return;

    const enrolledChildIds = this.program.enrollments?.map(e => e.childId) || [];
    this.availableChildren = this.children.filter(child => {
      const age = this.calculateAge(child.dateOfBirth);
      const isAgeEligible = age >= this.program.minAge && age <= this.program.maxAge;
      const isNotEnrolled = !enrolledChildIds.includes(child.id!);
      return isAgeEligible && isNotEnrolled;
    });
  }

  saveProgram(): void {
    this.isLoading = true;
    
    const programData = {
      ...this.program,
      date: new Date(this.program.date).toISOString().split('T')[0],
      startTime: this.program.startTime,
      endTime: this.program.endTime
    } as any;

    if (this.isEditMode && this.programId) {
      this.programService.updateProgram(this.programId, programData).subscribe({
        next: () => {
          this.isLoading = false;
          this.goBack();
        },
        error: (error) => {
          console.error('Error updating program:', error);
          alert('Error updating program');
          this.isLoading = false;
        }
      });
    } else {
      this.programService.createProgram(programData).subscribe({
        next: () => {
          this.isLoading = false;
          this.goBack();
        },
        error: (error) => {
          console.error('Error creating program:', error);
          alert('Error creating program');
          this.isLoading = false;
        }
      });
    }
  }

  enrollChild(childId: number | undefined): void {
    if (!this.programId || !childId) return;

    this.programService.enrollChild(this.programId, childId).subscribe({
      next: () => {
        this.loadProgram();
      },
      error: (error) => {
        console.error('Error enrolling child:', error);
        alert('Error enrolling child: ' + (error.error?.message || 'Unknown error'));
      }
    });
  }

  unenrollChild(childId: number): void {
    if (!this.programId) return;

    this.programService.unenrollChild(this.programId, childId).subscribe({
      next: () => {
        this.loadProgram();
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

  goBack(): void {
    this.router.navigate(['/programs']);
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