import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService {
  constructor(private apiService: ApiService, private router: Router) {}

  public canActivate() {
    return new Observable<boolean>((observer) => {
      const token = window.localStorage.getItem('token') ?? '';
      console.log(token);
      this.apiService.verify(token).subscribe({
        next: (data: any) => {
          observer.next(true);
          observer.complete();
        },
        error: (data: any) => {
          observer.next(false);
          observer.complete();
          this.router.navigate(['/']);
        }
      });
    })
  }
}
