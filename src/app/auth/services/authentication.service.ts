import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userUrl = environment.baseUrl + 'auth/login';
  userLogout = environment.baseUrl + 'auth/logout';
  urlSingUp = environment.baseUrl + 'auth/register/';

  constructor(private httpClient: HttpClient) {}

  login(user: string, password: string) {
    const data = {
      username: user,
      password: password,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.post<any>(this.userUrl, data, httpOptions);
  }

  logout(): Observable<any> {
    localStorage.clear();
    return this.httpClient.get(this.userLogout);
  }

  singUp(body:any): Observable<any> {
    return this.httpClient.post<any>(this.urlSingUp, body);
  }


  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn(): boolean {
    return this.getUser().username;
  }


  updateUserToken(resp: any) {
    localStorage.setItem('access', resp.access);
    const dataString = JSON.stringify(resp.user);
    try {
      localStorage.setItem('user', dataString);
      localStorage.setItem('id', resp.user.id);
      localStorage.setItem('username', resp.user.username);
    } catch (e) {}
    // this.$loggedInUserUpdated.next(dataString);
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  {
    provide: AuthenticationService,
    useClass: AuthenticationService,
  },
];
