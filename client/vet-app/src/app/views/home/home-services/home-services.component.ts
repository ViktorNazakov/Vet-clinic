import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { Subject } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InitialService } from 'src/app/services/intial.service';
@Component({
  selector: 'app-home-services',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './home-services.component.html',
  styleUrls: ['./home-services.component.scss'],
})
export class HomeServicesComponent implements AfterViewInit, OnDestroy {
  @Input() destroy: Subject<boolean> | undefined;
  activeSlide = 0;
  sliderinit = false;
  ratios: any[] = [];
  revealSlider = false;
  contentOpacity = 0;
  slider: KeenSliderInstance | undefined;
  slides: {
    title: string;
    description: string;
    redirect: {
      text: string;
      link: string;
    };
    img: string;
  }[] = [
    {
      title: 'Professional',
      img: 'assets/images/slider-1.jpg',
      description: `Nulla vel metus scelerisque ante sollicitudinlorem ipsuet commodo. Cras purus odio, vestibulum in vulputate a Imperdiet interdum donec eget metus auguen unc vel lorem. `,
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
    {
      title: 'Caring',
      img: 'assets/images/slider-2.jpg',
      description:
        'Nulla vel metus scelerisque ante sollicitudinlorem ipsuet commodo. Cras purus odio, vestibulum in vulputate a Imperdiet interdum donec eget metus auguen unc vel lorem. ',
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
    {
      title: 'Caring',
      img: 'assets/images/slider-3.jpg',
      description:
        'Nulla vel metus scelerisque ante sollicitudinlorem ipsuet commodo. Cras purus odio, vestibulum in vulputate a Imperdiet interdum donec eget metus auguen unc vel lorem. ',
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
    {
      title: 'Professional',
      img: 'assets/images/slider-1.jpg',
      description: `Nulla vel metus scelerisque ante sollicitudinlorem ipsuet commodo. Cras purus odio, vestibulum in vulputate a Imperdiet interdum donec eget metus auguen unc vel lorem. `,
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
    {
      title: 'Caring',
      img: 'assets/images/slider-2.jpg',
      description: 'Staff',
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
    {
      title: 'Caring',
      img: 'assets/images/slider-3.jpg',
      description: 'Staff',
      redirect: {
        link: 'home',
        text: 'Home',
      },
    },
  ];
  constructor(private iService: InitialService) {}
  ngAfterViewInit(): void {
    this.contentOpacity = 1;
    this.ratios = [];
    this.sliderinit = this.iService.sliderFeaturesInit;
    if (this.sliderinit === false) {
      this.slider = new KeenSlider('.services-container', {
        loop: true,
        slides: { number: this.slides.length, perView: 3 },
        breakpoints: {
          'max-width: ': {},
        },
        created: (inst) => {
          this.activeSlide = 0;
        },
        slideChanged: (inst) => {
          this.activeSlide = inst.track.details.rel;
          this.ratios = inst.track.details.slides.map((slide) => slide.portion);
        },
      });
      this.iService.sliderFeaturesInit = true;
    }

    this.checkSlider();
  }
  checkSlider() {
    !this.revealSlider
      ? setTimeout(() => {
          this.slider?.update();
          console.log(this.slider?.size);
          if ((this.slider?.size || 0) <= 100) {
            this.checkSlider();
          } else {
            this.revealSlider = true;
          }
        }, 1000)
      : false;
  }
  ngOnDestroy(): void {
    console.log('destroy');
    this.slider?.destroy();
  }
}
