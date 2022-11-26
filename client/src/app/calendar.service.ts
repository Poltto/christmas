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
  private closePopupSubject = new Subject<boolean>()
  public openGift$ = this.openGiftSubject.asObservable();
  public closePopup$ = this.closePopupSubject.asObservable();

  constructor() {

  }

  public openGift(door: any, location: {x: number, y: number}) {
    this.openGiftSubject.next({
      door: door,
      location: location
    });
  }

  public closePopup() {
    this.closePopupSubject.next(true);
  }

}
