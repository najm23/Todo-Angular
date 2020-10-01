import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = 'invalid credential';
  invalidLogin = false;
  constructor(
    private router: Router,
    private hardCodedAuthenticationService: HardcodedAuthenticationService
  ) {}

  ngOnInit(): void {}

  handleLogin(): void {
    if (
      this.hardCodedAuthenticationService.authenticate(
        this.username,
        this.password
      )
    ) {
      sessionStorage.setItem('authenticatedUser', this.username);
      // redirect to welcome page
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
