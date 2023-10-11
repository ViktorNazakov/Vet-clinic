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
  ratios: any[] = [];
  contentOpacity = 0;
  slides: {
    title: string;
    subtitle: string;
    redirect: {
      text: string;
      link: string;
    };
    img: string;
  }[] = [
    {
      title: 'Professional',
      img: 'assets/images/slider-1.jpg',
      subtitle: 'Certified veterinarians with diplomas',
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
    {
      title: 'Caring',
      img: 'assets/images/slider-2.jpg',
      subtitle: 'Staff',
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
    {
      title: 'Caring',
      img: 'assets/images/slider-3.jpg',
      subtitle: 'Staff',
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
  ];
  slider: KeenSliderInstance | undefined;
  ionViewWillEnter() {
    this.contentOpacity = 1;
    this.ratios = [];
    this.slider = new KeenSlider('.slider-container', {
      slides: this.slides.length,
      created: (inst) => {
        this.activeSlide = 0;
      },
      slideChanged: (inst) => {
        this.activeSlide = inst.track.details.rel;
        this.ratios = inst.track.details.slides.map((slide) => slide.portion);
      },
    });
  }
  ionViewWillLeave() {
    this.slider?.destroy();
  }

  constructor() {}
}
