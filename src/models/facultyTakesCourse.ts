import { Faculty } from './faculty';
import { Section } from './section';

export class FacultyTakesCourse {
  id?: number;
  faculty: Faculty;
  section: Section;
}
