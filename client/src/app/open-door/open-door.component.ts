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
  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) {

  }

  public open() {
    this.elementRef.nativeElement.classList.add('opening');
  }

  public ngAfterViewInit(): void {


  }

  public ngOnChanges(changes: SimpleChanges) {

  }
}
