import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component(
  {
    selector: 'glitter',
    templateUrl: './glitter.component.html',
    styleUrls: ['./glitter.component.scss']
  }
)
export class GlitterComponent implements AfterViewInit {

  @ViewChild('glitterContainer') glitterContainer: any;

  public htmlToAdd = '';

  constructor(private renderer: Renderer2) {

  }

  public ngAfterViewInit(): void {
    let nbElements = 10; // Number of stars & sparkles

// CSS Classes available
    let shapes = ['sparkle', 'star'];
    let sizes = ['','medium', 'small'];
    let styles = ['', 'alt', 'alt2'];
    let animations = ['pulse', 'pulse-1', 'pulse-2', 'pulse-3'];

// Random generating elements
    for(let i = 0; i < nbElements; i++){

      // Random styles
      let classes = [sizes[rand(0,sizes.length)]];
      classes = classes.filter(name => name !== '');
      let shape = shapes[rand(0,shapes.length)];
      let style = styles[rand(0,styles.length)];
      let animation = animations[rand(0,animations.length)];
      // Random position
      let element = this.renderer.createElement('div');
      if(shape) {
        this.renderer.addClass(element, shape);
      }
      if(style) {
        this.renderer.addClass(element, style);
      }
      if(animation) {
        this.renderer.addClass(element, animation);
      }
      this.renderer.addClass(element, 'glitter');

      this.renderer.setStyle(element, 'top', rand(0,100)+'%');
      this.renderer.setStyle(element, 'left', rand(0,100)+'%');
      this.renderer.appendChild(this.glitterContainer.nativeElement, element);
    }

    function rand(min: number, max: number){
      return Math.floor((Math.random() * max) + min);
    }
  }
}
