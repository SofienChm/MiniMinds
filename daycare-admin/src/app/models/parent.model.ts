export interface Parent {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  emergencyContact?: string;
  profilePicture?: string;
  createdAt?: Date;
  updatedAt?: Date;
  children?: any[];
}