import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';

import { CommonModule } from '@angular/common';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    RouterModule,
    ButtonModule,
    CommonModule,
    HomeSliderComponent,
  ],
})
export class HomePage {
  destroySlider$ = new Subject<boolean>();
  ionViewWillEnter() {}
  ionViewDidLeave() {
    this.destroySlider$.next(true);
  }

  constructor() {}
}
