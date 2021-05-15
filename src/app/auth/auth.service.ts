import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../shared/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessKeyURL;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(token) {
    this.accessKeyURL = BASEURL + 'auth-api/rest-auth/google/';
    const requestBody = {
      access_token: token,
    };
    return this.http.post(this.accessKeyURL, requestBody).subscribe((res) => {
      token = res['key'];
      this.http
        .get(BASEURL + 'auth-api/rest-auth/user/', {
          headers: { skip: 'skip', Authorization: 'Token ' + token },
        })
        .subscribe((user) => {
          user = { ...user, token: token };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(new User(user));
        });
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public isAuthenticated(): boolean {
    if (this.currentUserValue) {
      // authorised so return true
      return true;
    }
    return false;
  }

  public createAuthHeaderValue(): string {
    return 'TOKEN ' + this.currentUserValue.token;
  }

  public getUserRole(): string {
    let role;
    this.currentUser.subscribe((user) => {
      role = user?.role;
    });
    return role;
  }
}
