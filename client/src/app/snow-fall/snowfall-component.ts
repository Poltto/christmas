import { Component} from '@angular/core';

@Component({
  selector: 'snowfall',
  templateUrl: './snowfall.component.html',
  styleUrls: ['./snowfall.component.scss']
})
export class SnowfallComponent {

  public snowflakes: number[] = [];

  constructor() {
    for(let i = 0; i < 100; i++) {
      this.snowflakes.push(i);
    }
  }
}
