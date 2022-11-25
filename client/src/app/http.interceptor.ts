import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepting", httpRequest);
    let token = window.localStorage.getItem('token');
    return next.handle(httpRequest.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } }));

  }
}
