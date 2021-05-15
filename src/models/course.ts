import { Department } from './department';

export class Course {
  id?: number;
  course_code: string;
  title: string;
  lectures: number;
  tutorials: number;
  practicals: number;
  self_study: string;
  course_credits: string;
  department: number;
}
