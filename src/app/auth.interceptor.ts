import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginserviceService} from "./service/loginservice.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginserviceService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.loginService.getToken();
    request = request.clone(
      {
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    return next.handle(request);  }
}
