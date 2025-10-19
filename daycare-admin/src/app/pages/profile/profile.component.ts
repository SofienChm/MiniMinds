import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { TitlepageComponent, Breadcrumb } from '../../components/titlepage/titlepage.component';

interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  profilePicture?: string;
  role?: string;
}

interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  city?: string;
  profilePicture?: string;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, TitlepageComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/profile`;
  
  breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'bi bi-house' },
    { label: 'Profile', icon: 'bi bi-person-circle' }
  ];
  
  profile: UserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    profilePicture: '',
    role: 'Admin'
  };

  passwords = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  isEditing = false;
  isChangingPassword = false;
  profileImagePreview: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.profile = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        profilePicture: currentUser.profilePicture,
        role: this.authService.getUserRole() || 'Admin'
      };
      this.profileImagePreview = this.profile.profilePicture || null;
      
      // Fetch additional profile data from API
      this.fetchProfileData();
    }
  }

  fetchProfileData(): void {
    this.isLoading = true;
    this.http.get<UserProfile>(`${this.apiUrl}`).subscribe({
      next: (data) => {
        this.profile = { ...this.profile, ...data };
        this.profileImagePreview = this.profile.profilePicture || null;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.isLoading = false;
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      // Reset form if canceling
      this.loadProfile();
    }
  }

  togglePasswordChange(): void {
    this.isChangingPassword = !this.isChangingPassword;
    if (!this.isChangingPassword) {
      this.passwords = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only image files (JPEG, PNG, GIF) are allowed');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Show preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);

      // Upload file
      this.uploadProfileImage(file);
    }
  }

  uploadProfileImage(file: File): void {
    this.isLoading = true;
    const formData = new FormData();
    formData.append('file', file);

    this.http.post<{imageUrl: string}>(`${this.apiUrl}/upload-image`, formData).subscribe({
      next: (response) => {
        this.profile.profilePicture = `${environment.apiUrl.replace('/api', '')}${response.imageUrl}`;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
        this.isLoading = false;
      }
    });
  }

  saveProfile(): void {
    if (!this.profile.firstName || !this.profile.lastName || !this.profile.email) {
      alert('Please fill in all required fields');
      return;
    }

    this.isLoading = true;
    const updateData: UpdateProfileRequest = {
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      email: this.profile.email,
      city: this.profile.city,
      profilePicture: this.profile.profilePicture
    };

    this.http.put(`${this.apiUrl}`, updateData).subscribe({
      next: (response) => {
        // Update the current user in auth service
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            firstName: this.profile.firstName,
            lastName: this.profile.lastName,
            email: this.profile.email,
            profilePicture: this.profile.profilePicture
          };
          this.authService.updateCurrentUser(updatedUser);
        }
        
        alert('Profile updated successfully!');
        this.isEditing = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
        this.isLoading = false;
      }
    });
  }

  changePassword(): void {
    if (!this.passwords.currentPassword || !this.passwords.newPassword || !this.passwords.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (this.passwords.newPassword !== this.passwords.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (this.passwords.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    this.isLoading = true;
    const changePasswordData: ChangePasswordRequest = {
      currentPassword: this.passwords.currentPassword,
      newPassword: this.passwords.newPassword
    };

    this.http.put(`${this.apiUrl}/change-password`, changePasswordData).subscribe({
      next: (response) => {
        alert('Password changed successfully!');
        this.togglePasswordChange();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error changing password:', error);
        alert('Error changing password. Please check your current password and try again.');
        this.isLoading = false;
      }
    });
  }

  getInitials(): string {
    return (this.profile.firstName.charAt(0) + this.profile.lastName.charAt(0)).toUpperCase();
  }

  getRoleBadgeClass(): string {
    switch (this.profile.role) {
      case 'Admin': return 'bg-warning';
      case 'Teacher': return 'bg-success';
      case 'Parent': return 'bg-info';
      default: return 'bg-secondary';
    }
  }
}