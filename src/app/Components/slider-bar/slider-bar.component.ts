import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-slider-bar',
  standalone: true,
  imports: [NgbCarouselModule],
  templateUrl: './slider-bar.component.html',
  styleUrl: './slider-bar.component.css'
})
export class SliderBarComponent {

}
