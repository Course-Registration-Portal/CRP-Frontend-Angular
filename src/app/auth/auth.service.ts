import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../shared/baseURL';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessKeyURL;
  currentUserSubject: BehaviorSubject<string>;
  currentUser: Observable<string>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('authKey'));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  
  login(token) {
    this.accessKeyURL = BASEURL + 'auth-api/rest-auth/google/';
    const requestBody = {
        access_token: token,
    };
    return this.http.post(this.accessKeyURL, requestBody)
                .subscribe((response) => {
                    console.log(response);
                    localStorage.setItem('authKey', response['key']);
                });
  }

  isAuthenticated(): boolean{
    if (this.currentUserSubject.value){
        return true;
    }
    else{
        return false;
    }
  }

  public createAuthHeaderValue(): string {
    return 'TOKEN ' + this.currentUserSubject.value;
  }

  logout(){
      localStorage.removeItem('authKey');
      this.currentUserSubject.next(null);
  }
}
