export interface Program {
  id?: number;
  title: string;
  description?: string;
  capacity: number;
  minAge: number;
  maxAge: number;
  date: Date;
  startTime: string;
  endTime: string;
  createdAt?: Date;
  updatedAt?: Date;
  enrollments?: ProgramEnrollment[];
}

export interface ProgramEnrollment {
  id?: number;
  programId: number;
  childId: number;
  enrolledAt?: Date;
  child?: any;
}