import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  title = 'Course Registration Portal';

  constructor(authService: AuthService) {
    authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  ngOnInit(): void {}

  googleSignIn() {
    console.log('Google Login function called!!!');
  }
}
