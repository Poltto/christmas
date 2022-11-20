import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {

  }

  public verify(token: string) {
    return this.http.post('/d/auth/verify', {
      token: token
    });
  }

  public getCalendarDoors() {
    return this.http.get('/d/app/get-calendar-doors');
  }

  public login(data: {
    username: string,
    password: string
  }) {
    return this.http.post('/d/auth/login', {
      username: data.username,
      password: data.password
    });
  }
}
