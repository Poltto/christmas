import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'calendar-door',
  templateUrl: './door.component.html',
  styleUrls: ['./door.component.scss']
})
export class CalendarDoorComponent implements AfterViewInit, OnChanges{

  public isOpen: boolean = false;

  @Input()
  public door: any;
  @Input()
  public container!: HTMLElement;
  @Input()
  public mainCanvas!: HTMLCanvasElement;
  @Input()
  public isCanvasDrawing: boolean = true;

  @ViewChild('canvas')
  public canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doorRef')
  public doorRef!: ElementRef<HTMLElement>;
  constructor(private elementRef: ElementRef) {

  }

  public open() {
    this.isOpen = true;
    this.elementRef.nativeElement.classList.add('opening');
  }

  public ngAfterViewInit(): void {


  }

  public ngOnChanges(changes: SimpleChanges) {
    if(changes['isCanvasDrawing'] && !changes['isCanvasDrawing'].currentValue) {
      let containerRect = this.container.getBoundingClientRect();
      let left = this.elementRef.nativeElement.offsetLeft;
      let top = this.elementRef.nativeElement.offsetTop;
      let width = this.elementRef.nativeElement.offsetWidth;
      let height = this.elementRef.nativeElement.offsetHeight;
      let canvas = this.canvas.nativeElement;
      canvas.width = width - 8;
      canvas.height = height - 8;
      let mainContext = this.mainCanvas.getContext('2d');
      let ctx = canvas.getContext('2d');
      if(ctx && mainContext) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let imageData = mainContext.getImageData(left, top, width, height);
        ctx.putImageData(imageData, 0, 0);
      }
    }
  }
}
