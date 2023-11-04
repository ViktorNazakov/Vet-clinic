import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';

import { CommonModule } from '@angular/common';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { Subject } from 'rxjs';
import { AccordionModule } from 'primeng/accordion';
import { HomeServicesComponent } from './home-services/home-services.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from 'src/app/components/footer/footer.component';
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
    HomeServicesComponent,
    AccordionModule,
    ReactiveFormsModule,
    FooterComponent,
  ],
})
export class HomePage {
  destroySlider$ = new Subject<boolean>();
  newsletterForm = this.fBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  contactForm = this.fBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });
  ionViewWillEnter() {}
  ionViewDidLeave() {
    this.destroySlider$.next(true);
  }

  constructor(private fBuilder: FormBuilder) {}
}
