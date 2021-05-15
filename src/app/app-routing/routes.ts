import { Routes } from '@angular/router';

// Import all the components here so that you may route amongst them
// Header and Footer components are not needed because we are not navigating in Header and Footer

// Template: import { 'ComponentClassName' } from '../component_name/component_name.component.ts'
import { HomeComponent } from '../home/home.component';
import { AuthComponent } from '../auth/auth.component';
import { CourseComponent } from '../course/course.component';
import { AddCourseComponent } from '../course/add-course/add-course.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'add-course', component: AddCourseComponent },
];
