import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BasicAuthenticationService} from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(private basicAuthenticationService: BasicAuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = this.basicAuthenticationService.getAuthenticatedUser();
    const basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();

    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorisation: basicAuthHeaderString
        }
      });
    }
    return next.handle(request);
  }
}
