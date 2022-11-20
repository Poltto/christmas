import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.verify(window.localStorage.getItem('token') ?? '').subscribe((data: any) => {
      this.router.navigate(['/main']);
    });
  }

  public login() {
    this.apiService.login({
      username: this.username,
      password: this.password
    }).subscribe((data: any) => {
      window.localStorage.setItem('token', data);
      this.router.navigate(['/main']);
    });
  }

}
