import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleLogin() {
    //console.log('user : ' + this.username + ' // pass: ' + this.password);

    if (this.username === 'nothmani' && this.password === 'azerty') {
      //redirect to welcome page
      this.router.navigate(['welcome', this.username]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
