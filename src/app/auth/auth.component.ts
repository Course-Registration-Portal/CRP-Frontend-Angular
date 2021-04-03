import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { BASEURL } from '../shared/baseURL';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  selectedCSV: File;

  constructor(private http: HttpClient) {
    this.selectedCSV = null;
  }

  ngOnInit(): void {}

  onFileSelected(event) {
    this.selectedCSV = event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('csv', this.selectedCSV, this.selectedCSV.name);
    this.http
      .post(BASEURL + 'auth-api/upload-csv/', fd)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
