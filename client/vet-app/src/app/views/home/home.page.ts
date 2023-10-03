import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, ButtonModule, CommonModule],
})
export class HomePage {
  activeSlide = 0;
  opacities: any[] = [];
  slides: {
    title: string;
    subtitle: string;
    summary: string;
    img: string;
  }[] = [
    {
      title: 'Professional',
      img: 'assets/images/slider_img_1.png',
      subtitle: 'Services',
      summary: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
      omnis eius consequuntur molestiae quas.`,
    },
    {
      title: 'Caring',
      img: 'assets/images/slider_img_1.png',
      subtitle: 'Staff',
      summary: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
      omnis eius consequuntur molestiae quas.`,
    },
    {
      title: 'Caring',
      img: 'assets/images/slider_img_1.png',
      subtitle: 'Staff',
      summary: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda
      omnis eius consequuntur molestiae quas.`,
    },
  ];
  slider: KeenSliderInstance | undefined;
  ionViewWillEnter() {
    this.opacities = [];
    this.slider = new KeenSlider('.slider-container', {
      drag: false,
      loop: true,
      slides: this.slides.length,
      defaultAnimation: {
        duration: 0,
      },
      created: (inst) => {
        this.activeSlide = 0;
      },
      slideChanged: (inst) => {
        this.activeSlide = inst.track.details.rel;
        this.opacities = inst.track.details.slides.map(
          (slide) => slide.portion
        );
      },
    });
  }
  ionViewWillLeave() {
    this.slider?.destroy();
  }
  constructor() {}
}
