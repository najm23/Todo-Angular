import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

export class AuthenticationBean {
  constructor(public message: string) {
  }
}

@Injectable({
  providedIn: 'root',
})
export class BasicAuthenticationService {
  AUTHENTICATED_USER = 'authenticatedUser';
  TOKEN = 'token';

  constructor(private http: HttpClient) {
  }

  executeAuthenticationService(username, password): Observable<AuthenticationBean> {
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString,
    });
    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`,
      {headers}).pipe(
      map(
        data => {
          sessionStorage.setItem(this.AUTHENTICATED_USER, username);
          sessionStorage.setItem(this.TOKEN, basicAuthHeaderString);
          return data;
        }
      )
    );
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem(this.AUTHENTICATED_USER);
  }

  getAuthenticatedToken(): string {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(this.TOKEN);
    }
  }

  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem(this.AUTHENTICATED_USER) === null);
  }

  logOut(): void {
    sessionStorage.removeItem(this.AUTHENTICATED_USER);
    sessionStorage.removeItem(this.TOKEN);
  }


}
