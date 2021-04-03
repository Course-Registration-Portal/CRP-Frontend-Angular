import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { User } from '../auth/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  loggedIn: boolean;

  title = 'Course Registration Portal';

  constructor(
    private socialAuthService: SocialAuthService,
    private authService: AuthService
  ) {
    authService.currentUser.subscribe((user) => (this.currentUser = user));

    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.authService.login(user.authToken);
        this.loggedIn = user != null;
      }
    });
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthenticated();
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.logout();
  }

  googleSignIn() {
    console.log('Google Login function called!!!');
  }
}
