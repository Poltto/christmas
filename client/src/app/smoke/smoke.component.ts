import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'smoke',
  templateUrl: './smoke.component.html',
  styleUrls: ['./smoke.component.scss'],
  standalone: true,
  imports: [

  ]
})
export class SmokeComponent implements AfterViewInit {

  @ViewChild('smokeContainer') smokeContainer: ElementRef|undefined;
  @ViewChild('smokeCanvas') smokeCanvas: ElementRef|undefined;

  constructor(private elementRef: ElementRef) {

  }

  public ngAfterViewInit(): void {
    let count = 0;
    let canvas = this.smokeCanvas?.nativeElement;
    canvas.height = this.smokeContainer?.nativeElement.getBoundingClientRect().height;
    canvas.width = this.smokeContainer?.nativeElement.getBoundingClientRect().width;
    let ctx = canvas.getContext('2d');

    let images = [
      'assets/1.png',
      'assets/2.png',
      'assets/3.png',
      'assets/4.png',
      'assets/5.png',
      'assets/6.png',
      'assets/7.png',
      'assets/8.png',
      'assets/9.png',
    ]
    let loadedImages: any[] = [null, null, null, null, null, null, null, null, null];
    let promise = new Promise((resolve, reject) => {
      let loaded = 0;
      images.forEach((image, index) => {
        let img = new Image();
        img.src = image;
        img.onload = function(loadedImage: any) {
          loaded++;
          loadedImages[index] = img;
          if(loaded === images.length) {
            resolve(true);
          }
        }
      })
    })

    promise.then(() => {
      let interval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(loadedImages[count], 0, 0, loadedImages[count].width, loadedImages[count].height, 0, 0, canvas.width, canvas.height);
        count++;
        if(count > 8) {
          clearInterval(interval);
          this.elementRef.nativeElement.style.opacity = 0;
        }
      }, 100);
    })


  }
}
