import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  AUTHENTICATED_USER = 'authenticatedUser';
  constructor() {}

  authenticate(username, password): boolean {
    if (username === 'nothmani' && password === '123') {
      return true;
    } else {
      return false;
    }
  }
  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem(this.AUTHENTICATED_USER) === null);
  }

  logOut(): void {
    sessionStorage.removeItem(this.AUTHENTICATED_USER);
  }
}
