import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'Course Registration Portal';

  constructor() { }

  ngOnInit(): void {
  }

  googleSignIn(){
    console.log('Google Login function called!!!');
  }
}
