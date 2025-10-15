export interface Child {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  gender: string;
  allergies?: string;
  medicalNotes?: string;
  profilePicture?: string;
  parentId: number;
  enrollmentDate?: Date | string;
  parent?: any;
  createdAt?: Date;
  updatedAt?: Date;
}