import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BasicAuthenticationService} from '../service/basic-authentication.service';

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
    private basicAuthentication: BasicAuthenticationService
  ) {}

  ngOnInit(): void {}

  handleBasicAuthLogin(): void {
    this.basicAuthentication.executeAuthenticationService(this.username, this.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['welcome', this.username]);
          this.invalidLogin = false;
        },
        error => {
          console.log(error);
          this.invalidLogin = true;
        });
  }

}
