import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BASEURL } from '../../shared/constants';

import { Section } from '../../../models/section';
import { Course } from '../../../models/course';
import { Faculty } from '../../../models/faculty';
import { FacultyTakesCourse } from '../../../models/facultyTakesCourse';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
})
export class AddCourseComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string = '/courses';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      department: ['', [Validators.required]],

      course_code: ['', [Validators.required]],
      title: ['', [Validators.required]],
      lectures: ['', [Validators.required]],
      tutorials: ['', [Validators.required]],
      practicals: ['', [Validators.required]],
      self_study: ['', [Validators.required]],
      course_credits: ['', [Validators.required]],
      offering_department: ['', [Validators.required]],

      semester: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Create request body
    let faculty: Faculty = {
      user: this.registerForm.value.user,
      departmnet: this.registerForm.value.department,
    };

    let course: Course = {
      course_code: this.registerForm.value.course_code,
      title: this.registerForm.value.title,
      lectures: this.registerForm.value.lectures,
      tutorials: this.registerForm.value.tutorials,
      practicals: this.registerForm.value.practicals,
      self_study: this.registerForm.value.self_study,
      course_credits: this.registerForm.value.course_credits,
      department: this.registerForm.value.department,
    };

    let section: Section = {
      course: course,
      semester: this.registerForm.value.semester,
      year: this.registerForm.value.year,
    };

    let facultyTakesCourse: FacultyTakesCourse = {
      faculty: faculty,
      section: section,
    };

    // POST
    this.http
      .post(BASEURL + 'faculty/faculty-courses/', facultyTakesCourse)
      .subscribe((response) => {
        this.router.navigate['/courses'];
      });
  }
}
