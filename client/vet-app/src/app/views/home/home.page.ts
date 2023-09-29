import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, ButtonModule],
})
export class HomePage {
  slider: any;
  ionViewWillEnter() {
    this.slider = new KeenSlider('.slider-container', {
      drag: false,
      loop: true,
      slides: 2,
    });
  }
  constructor() {}
}
