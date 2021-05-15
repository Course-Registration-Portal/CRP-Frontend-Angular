import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';
import {
  ADMIN_ROLE,
  FACULTY_ROLE,
  STUDENT_ROLE,
  BASEURL,
} from '../shared/constants';

import { FacultyTakesCourse } from '../../models/facultyTakesCourse';
import { DisplayData } from './interfaces';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CourseComponent implements OnInit {
  role: number = 3;
  allCourses: Array<DisplayData> = [];

  columnHeader = [
    'Course Code',
    'Course Title',
    'Department',
    'Semester',
    'Year',
  ];
  columnsToDisplay = ['id', 'name', 'department', 'semester', 'year'];

  expandedElement: FacultyTakesCourse | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate['/home'];
    }

    switch (this.authService.getUserRole()) {
      case ADMIN_ROLE:
        this.role = 0;
        break;
      case FACULTY_ROLE:
        this.role = 1;
        break;
      case STUDENT_ROLE:
        this.role = 2;
        break;
      default:
        this.router.navigate['/login'];
    }
    this.getCoursesData();
  }

  getCoursesData() {
    this.http
      .get(BASEURL + 'faculty/faculty-courses/')
      .subscribe((data: Array<FacultyTakesCourse>) => {
        this.allCourses = [];
        console.log(data);
        for (let course of data) {
          let course_data: DisplayData = {
            id: course.id,
            code: course.section?.course.course_code,
            name: course.section?.course.title,
            faculty: course.faculty.id,
            l: course.section?.course.lectures,
            t: course.section?.course.tutorials,
            p: course.section?.course.practicals,
            s: course.section?.course.self_study,
            c: course.section?.course.course_credits,
            department: course.section?.course.department,
            semester: course.section?.semester,
            year: course.section?.year,
          };
          this.allCourses.push(course_data);
        }
      });
  }
}
