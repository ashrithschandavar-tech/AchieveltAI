
export enum GoalCategory {
  EDUCATION = 'Education',
  SKILLS = 'Skills',
  FITNESS = 'Fitness',
  CREATIVE = 'Creative',
  PROJECTS = 'Projects',
  OTHER = 'Other Structured Goals'
}

export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface Milestone {
  title: string;
  description: string;
  timeframe: string;
}

export interface Resource {
  name: string;
  type: 'Video' | 'Article' | 'Book' | 'Course' | 'Tool';
  description: string;
  estimated_cost: string;
}

export interface GoalPlan {
  title: string;
  summary: string;
  difficulty: string;
  isTimeframeRealistic: boolean;
  timeframeWarning?: string;
  milestones: Milestone[];
  resources: Resource[];
  dailyHabits: string[];
  weeklyChecklist: string[];
  commonObstacles: { obstacle: string; solution: string }[];
}

export interface GoalInput {
  topic: string;
  category: GoalCategory;
  difficulty: DifficultyLevel;
  dueDate: string;
}
