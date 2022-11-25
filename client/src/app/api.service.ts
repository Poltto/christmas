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

  public openDoor(id: number) {
    console.log("opening door with id ", id);
    return this.http.post('/d/app/open-door', {
      id: id
    });
  }

  public getCalendarDoors() {
    return this.http.post('/d/app/get-calendar-doors', {});
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
