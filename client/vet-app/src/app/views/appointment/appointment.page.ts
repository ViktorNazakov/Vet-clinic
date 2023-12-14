import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  getProfileDetails,
  getUserPets,
} from 'src/app/store/selectors/profile.selectors';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { Pet, Vet } from 'src/app/models/user.models';
import { DATA_ACTIONS } from 'src/app/store/actions/data.actions';
import {
  getVetsData,
  getVetsDataLoading,
} from 'src/app/store/selectors/data.selectors';
import { CalendarModule } from 'primeng/calendar';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    IonicModule,
    FooterComponent,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage {
  pets = this.store.select(getUserPets);
  vets = this.store.select(getVetsData);
  vetsLoading = this.store.select(getVetsDataLoading);
  userDetails = this.store.select(getProfileDetails);
  baseDate = new Date(new Date().setHours(0, 0, 0, 0));
  appForm = this.fBuilder.group({
    pet: ['', Validators.required],
    vet: ['', Validators.required],
    time: [this.baseDate, Validators.required],
    description: ['', [Validators.minLength(10), Validators.required]],
  });
  selectedPet!: Pet;
  selectedVet!: Vet;
  constructor(private fBuilder: FormBuilder, private store: Store) {}

  ionViewWillEnter() {
    this.store.dispatch(ProfileActions.loadAttempt());
    this.store.dispatch(DATA_ACTIONS.loadVets());
  }
  ionViewWillLeave() {}
  createAppointment() {
    this.appForm.markAllAsTouched();

    if (this.appForm.valid) {
      this.store.dispatch(
        ProfileActions.createAppointment({
          time: this.appForm.value.time || new Date(),
          pet: this.appForm.value.pet || '',
          description: this.appForm.value.description || '',
          vet: this.appForm.value.vet || '',
        })
      );
    }
  }
}
