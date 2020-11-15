import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {API_URL, AUTHENTICATED_USER, TOKEN} from '../app.constants';

export class AuthenticationBean {
  constructor(public message: string) {
  }
}


@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  constructor(private http: HttpClient) {
  }

  executeAuthenticationService(username, password): Observable<AuthenticationBean> {
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,
      {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  executeJWTAuthenticationService(username, password): Observable<AuthenticationBean> {
    return this.http.post<any>(`${API_URL}/authenticate`,
      {username, password}).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);

          console.log(`logTOKEN : ` + sessionStorage.getItem(TOKEN));
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken(): string {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem(AUTHENTICATED_USER) === null);
  }

  logOut(): void {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }


}
