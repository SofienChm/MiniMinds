import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParentService } from '../../services/parent.service';
import { Parent } from '../../models/parent.model';
import { TitlepageComponent, Breadcrumb, TitleAction } from '../../components/titlepage/titlepage.component';

@Component({
  selector: 'app-parents',
  standalone: true,
  imports: [CommonModule, FormsModule, TitlepageComponent],
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [
    { label: 'Dashboard', url: '/dashboard', icon: 'bi bi-house' },
    { label: 'Parents', icon: 'bi bi-people' }
  ];
  
  titleActions: TitleAction[] = [
    {
      label: 'Add Parent',
      icon: 'bi bi-plus-circle',
      class: 'btn btn-primary',
      action: () => this.openAddModal()
    }
  ];

  showExportDropdown = false;

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

  exportToPDF(): void {
    const data = this.filteredParents.map(parent => ({
      'Name': `${parent.firstName} ${parent.lastName}`,
      'Email': parent.email,
      'Phone': parent.phoneNumber,
      'Address': parent.address || 'N/A',
      'Emergency Contact': parent.emergencyContact || 'N/A',
      'Children Count': parent.children?.length || 0,
      'Created Date': parent.createdAt ? new Date(parent.createdAt).toLocaleDateString() : 'N/A'
    }));

    this.generatePDF(data, 'Parents Report');
  }

  exportToExcel(): void {
    const data = this.filteredParents.map(parent => ({
      'Name': `${parent.firstName} ${parent.lastName}`,
      'Email': parent.email,
      'Phone': parent.phoneNumber,
      'Address': parent.address || 'N/A',
      'Emergency Contact': parent.emergencyContact || 'N/A',
      'Children Count': parent.children?.length || 0,
      'Created Date': parent.createdAt ? new Date(parent.createdAt).toLocaleDateString() : 'N/A'
    }));

    this.generateExcel(data, 'Parents Report');
  }

  private generatePDF(data: any[], title: string): void {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    
    // Create HTML table for PDF
    let htmlContent = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
    `;
    
    data.forEach(row => {
      htmlContent += '<tr>';
      headers.forEach(header => {
        htmlContent += `<td>${row[header]}</td>`;
      });
      htmlContent += '</tr>';
    });
    
    htmlContent += `
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Open in new window for printing to PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      
      // Auto-trigger print dialog
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  }

  private generateExcel(data: any[], title: string): void {
    const headers = Object.keys(data[0] || {});
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
      });
      csvContent += values.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
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