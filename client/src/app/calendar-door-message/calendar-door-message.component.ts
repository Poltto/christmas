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
  }

  private open(openGift: IOpenGift) {
    this.currentMessage = openGift.door.content;
    this.elementRef.nativeElement.style.left = openGift.location.x + 'px';
    this.elementRef.nativeElement.style.top = openGift.location.y + 'px';
    this.elementRef.nativeElement.style.width = 0 + 'px';
    this.elementRef.nativeElement.style.height = 0 + 'px';
    this.elementRef.nativeElement.style.display = 'block';
    this.elementRef.nativeElement.style.opacity = 1;
    let animationDuration = 1000;
    let targetWidth = 1000;
    let targetHeight = 600;
    let targetLocation = {
      x: (window.innerWidth/2) - (targetWidth/2),
      y: (window.innerHeight/2) - targetHeight/2
    }
    let timeElapsed = 0;
    let interval = setInterval(() => {
      if(timeElapsed <= animationDuration) {
        this.elementRef.nativeElement.style.width = targetWidth * (timeElapsed / animationDuration) + 'px';
        this.elementRef.nativeElement.style.height = targetHeight * (timeElapsed / animationDuration) + 'px';
        this.elementRef.nativeElement.style.left = openGift.location.x + (targetLocation.x - openGift.location.x) * (timeElapsed / animationDuration) + 'px';
        this.elementRef.nativeElement.style.top = openGift.location.y + (targetLocation.y - openGift.location.y) * (timeElapsed / animationDuration) + 'px';
        timeElapsed += 10;
      }
    }, 10)
    setTimeout(() => {
      clearInterval(interval);
      if(this.innerContainer) {
        this.innerContainer.nativeElement.style.opacity = 1;
      }
    }, 1100);
  }

  private close() {
    this.elementRef.nativeElement.display = 'none';
    this.elementRef.nativeElement.style.width = 0;
    this.elementRef.nativeElement.style.height = 0;
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
