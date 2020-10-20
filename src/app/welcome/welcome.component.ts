import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WelcomeDataService} from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  name = '';
  welcomeMessageFromService = '';
  welcomeMessageFromServiceWithParam = '';
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
  }

  getWelcomeMessageWithParameter(): void {
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponseWithParams(response),
      error => this.handleErrorResponseWithParams(error)
    );
  }

  private handleSuccessfulResponse(response): void {
    this.welcomeMessageFromService = response.message;
  }

  private handleSuccessfulResponseWithParams(response): void {
    this.welcomeMessageFromServiceWithParam = response.message;
  }
  private handleErrorResponse(httpError): void {
    this.welcomeMessageFromService = httpError.error.message;
  }

  private handleErrorResponseWithParams(httpError): void {
    this.welcomeMessageFromService = httpError.error.message;
  }
}
