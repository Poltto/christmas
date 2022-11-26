import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CalendarService } from '../calendar.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'open-calendar-door',
  templateUrl: './open-door.component.html',
  styleUrls: ['./open-door.component.scss']
})
export class CalendarOpenDoorComponent implements AfterViewInit, OnChanges{


  @Input()
  public door: any;

  @ViewChild('canvas')
  public canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doorRef')
  public doorRef!: ElementRef<HTMLElement>;

  private glitterVisible = false;
  public isSmokeVisible = false;

  constructor(
    private elementRef: ElementRef,
    private calendarService: CalendarService,
    private apiService: ApiService
    ) {

  }

  public open() {
    if(!this.door.isopened) {
      this.isSmokeVisible = true;
    }
    let bbox = this.doorRef.nativeElement.getBoundingClientRect();

    setTimeout(() => {
      this.door.isopened = true;
      this.calendarService.openGift(this.door, {
        x: bbox.left,
        y: bbox.top
      });
      this.apiService.openDoor(this.door.id).subscribe((data: any) => {
        console.log('opened door');
      });
    }, 500);

  }

  public isGlitterVisible() {
    return this.door.isOpen && this.glitterVisible;
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.glitterVisible = true;
    }, 800);

  }

  public ngOnChanges(changes: SimpleChanges) {

  }
}
