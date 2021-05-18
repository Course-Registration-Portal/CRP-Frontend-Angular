import { Component, OnInit, ViewChild } from '@angular/core';
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

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
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
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  dataSource;
  displayedColumns: Array<string>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate['/home'];
    }

    switch (this.authService.getUserRole()) {
      case ADMIN_ROLE:
        this.role = 0;
        this.getCoursesData();
        break;
      case FACULTY_ROLE:
        this.role = 1;
        break;
      case STUDENT_ROLE:
        this.role = 2;
        this.studentView();
        this.dataSource.paginator = this.paginator;
        break;
      default:
        this.router.navigate['/login'];
    }
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

  studentView() {
    this.displayedColumns = [
      'id',
      'code',
      'name',
      'lectures',
      'department',
      'Actions',
    ];
    this.dataSource = new MatTableDataSource<DisplayData>(COURSE_DATA);
  }

  getRecord(name) {
    alert(name);
  }

  openDialog() {
    let dialogRef = this.dialog.open(CourseDetailsDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked on positive value
        // If course has prerequisites, check the prerequisites flow, else, create an enrolment request
        dialogRef = this.dialog.open(CheckPrerequisites);
        dialogRef.afterClosed().subscribe((result) => {});
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-box.html',
})
export class CourseDetailsDialogComponent {}

@Component({
  selector: 'check-prerequisites',
  templateUrl: 'check-prerequisites.html',
})
export class CheckPrerequisites {
  clear = true;
}

const COURSE_DATA: Array<DisplayData> = [
  {
    id: 1,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 2,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 3,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 4,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 5,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 6,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 7,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 8,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 9,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 10,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 11,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 12,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 13,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 14,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 15,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 16,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 17,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
  {
    id: 18,
    code: 'CS101',
    name: 'Basic Computing',
    faculty: 1,
    l: 3,
    t: 2,
    p: 1,
    s: '3.5',
    c: '1.5',
    department: 1,
    semester: 'First',
    year: 2021,
  },
];
