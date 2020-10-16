import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {WelcomeDataService} from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  name = '';
  welcomeMessageFromService = '';
  // ActivatedRoute
  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params.name;
  }
  getWelcomeMessage(): void{
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)

    );
    console.log('last line');
  }

  handleSuccessfulResponse(response): void{
    this.welcomeMessageFromService = response.message;
  }

  private handleErrorResponse(httpError): void {
    this.welcomeMessageFromService = httpError.error.message;
  }
}
