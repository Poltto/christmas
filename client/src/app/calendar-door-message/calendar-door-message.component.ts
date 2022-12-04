import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CalendarService, IOpenGift } from '../calendar.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'calendar-door-message',
  templateUrl: './calendar-door-message.component.html',
  styleUrls: ['./calendar-door-message.component.scss']
})
export class CalendarDoorMessageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('innerContainer') innerContainer: ElementRef|null = null;

  private destroyed$ = new ReplaySubject(1);
  public currentMessage: string = '';
  constructor(private calendarService: CalendarService, private elementRef: ElementRef) {


  }


  public ngAfterViewInit(): void {
    this.calendarService.openGift$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((openGift: IOpenGift) => {
      this.open(openGift);
    })

    this.calendarService.closePopup$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      this.close();
    })
  }

  private open(openGift: IOpenGift) {
    this.currentMessage = openGift.door.content;
    this.elementRef.nativeElement.classList.add('show');
  }

  public close() {
    this.elementRef.nativeElement.classList.remove('show');
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
