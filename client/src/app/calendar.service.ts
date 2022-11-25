import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IOpenGift {
  door: any;
  location: {
    x: number;
    y: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private openGiftSubject = new Subject<IOpenGift>()
  public openGift$ = this.openGiftSubject.asObservable();

  constructor() {

  }

  public openGift(door: any, location: {x: number, y: number}) {
    this.openGiftSubject.next({
      door: door,
      location: location
    });
  }


}
