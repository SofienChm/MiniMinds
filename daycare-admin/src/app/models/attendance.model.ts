export interface Attendance {
  id?: number;
  childId: number;
  checkInTime: Date | string;
  checkOutTime?: Date | string;
  date: Date | string;
  checkInNotes?: string;
  checkOutNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  child?: any;
}