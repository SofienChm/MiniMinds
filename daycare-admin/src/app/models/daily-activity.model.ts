export interface DailyActivity {
  id?: number;
  childId: number;
  activityType: string;
  activityTime: Date | string;
  duration?: string;
  notes?: string;
  foodItem?: string;
  mood?: string;
  createdAt?: Date;
  child?: any;
}

export const ActivityTypes = [
  'Nap',
  'Eat',
  'Play',
  'Diaper Change',
  'Outdoor Activity',
  'Learning Activity',
  'Other'
];

export const MoodTypes = [
  'Happy',
  'Sad',
  'Cranky',
  'Sleepy',
  'Energetic',
  'Calm'
];