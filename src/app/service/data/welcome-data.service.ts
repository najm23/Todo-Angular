import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


export class HelloWorldBean {
  constructor(public message: string){}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }


  executeHelloWorldBeanService(): Observable<HelloWorldBean>{
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executeHelloWorldServiceWithPathVariable(name): Observable<HelloWorldBean> {
    const basicAuthenticationString = this.createBasicAuthenticationHeader();
    const headers = new HttpHeaders({
      Authorization: basicAuthenticationString
    });
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`,
      {headers});
  }

  createBasicAuthenticationHeader(): string {
    const username = 'nothmani';
    const password = '1234';
    return 'Basic ' + window.btoa(username + ':' + password);
  }

// Access to XMLHttpRequest at 'http://localhost:8080/hello-world-bean' from origin 'http://localhost:4200' has been blocked by CORS policy:
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
// zone-evergreen.js:2845 GET http://localhost:8080/hello-world-bean net::ERR_FAILED
}
