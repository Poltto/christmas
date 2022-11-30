import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { fromEvent } from 'rxjs';
import { CalendarService } from '../calendar.service';
import { isSameDay } from 'date-fns';

interface IDoor {
  id: number;
  isOpen: boolean;
  isopened: boolean;
  content: string;
  date: Date;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  @ViewChild('mainContainer')
  public mainContainer: any;
  @ViewChild('offscreenCanvas')
  public offscreenCanvas: any;

  public isCanvasDrawing: boolean = true;
  public calendarDoors: IDoor[] = [];

  constructor(private apiService: ApiService, private calendarService: CalendarService) {
    this.apiService.getCalendarDoors().subscribe((data: any) => {
      this.calendarDoors = data.map((door: any) => {
        return {
          ...door,
          isOpen: door.isopened
        }
      });
    })
  }

  public isOpenable(door: any) {
    return isSameDay(new Date(), new Date(door.date));
  }

  public openDoor(door: IDoor) {
    let index = this.calendarDoors.findIndex(singleDoor => door.id === singleDoor.id);
    this.calendarDoors[index].isOpen = true;
  }

  ngAfterViewInit(): void {
    let background = new Image();
    let self = this;
    let canvas = this.offscreenCanvas.nativeElement;
    canvas.width = this.mainContainer.nativeElement.offsetWidth;
    canvas.height = this.mainContainer.nativeElement.offsetHeight;
    let ctx = canvas.getContext('2d');
    background.src = 'assets/calendar-background.jpg';
    background.onload = function(image) {
      if(ctx) {
        ctx.drawImage(background, 0, 0, background.width, background.height, 0, 0, canvas.width, canvas.height);
        self.isCanvasDrawing = false;
      }
    }

    fromEvent(document, 'keydown').subscribe((event: any) => {
      if(event.key === 'Escape') {
        this.calendarService.closePopup();
      }
    });
  }
}
