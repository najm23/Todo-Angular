import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  constructor() {}

  authenticate(username, password) {
    if (username === 'nothmani' && password === '123') {
      return true;
    } else {
      return false;
    }
  }
}
