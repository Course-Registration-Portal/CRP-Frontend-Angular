import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean=false;
  constructor(private authService: SocialAuthService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
