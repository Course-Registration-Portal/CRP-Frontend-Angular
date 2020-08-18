import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AuthService } from './auth.service';

import { BASEURL } from '../shared/baseURL';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  selectedCSV: File;

  constructor(private socialAuthService: SocialAuthService, private http: HttpClient,
              private authService: AuthService) {
    this.selectedCSV = null;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
    this.authService.logout();
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.authService.login(user.authToken);
      this.loggedIn = (user != null);
    });
  }

  onFileSelected(event){
    this.selectedCSV = event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('csv', this.selectedCSV, this.selectedCSV.name);
    this.http.post(BASEURL + 'auth-api/upload-csv/', fd)
      .subscribe(response => {
        console.log(response);
      });
  }
}
