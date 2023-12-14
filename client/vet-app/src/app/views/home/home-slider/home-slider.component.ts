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
import { InitialService } from 'src/app/services/intial.service';
@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss'],
})
export class HomeSliderComponent implements AfterViewInit, OnDestroy {
  @Input() destroy: Subject<boolean> | undefined;
  activeSlide = 0;
  ratios: any[] = [];
  revealSlider = false;
  sliderActive = false;
  contentOpacity = 0;
  slider: KeenSliderInstance | undefined;
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
  constructor(private iService: InitialService) {}
  ngAfterViewInit(): void {
    this.sliderActive = this.iService.sliderInit;
    this.contentOpacity = 1;
    this.ratios = [];
    if (this.sliderActive === false) {
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
      this.iService.sliderInit = true;
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
    this.slider?.destroy();
  }
}
