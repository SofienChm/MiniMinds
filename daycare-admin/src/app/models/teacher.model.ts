export interface Teacher {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth: Date;
  hireDate: Date;
  specialization?: string;
  salary: number;
  profilePicture?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTeacher {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  dateOfBirth: Date;
  hireDate: Date;
  specialization?: string;
  salary: number;
  profilePicture?: string;
  password: string;
}