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
  ],
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage {
  pets = this.store.select(getUserPets);
  userDetails = this.store.select(getProfileDetails);
  userSub!: Subscription;
  appForm = this.fBuilder.group({
    pet: [0, Validators.required],
    fullName: { value: '', validators: [Validators.required], disabled: true },
  });
  selectedPet!: Pet;
  selectedVet!: Vet;
  constructor(private fBuilder: FormBuilder, private store: Store) {}

  ionViewWillEnter() {
    this.store.dispatch(ProfileActions.loadAttempt());
    this.userSub = this.userDetails.pipe().subscribe((props) =>
      this.appForm.patchValue({
        fullName: props.firstName + ' ' + props.lastName,
      })
    );
  }
  ionViewWillLeave() {
    this.userSub?.unsubscribe();
  }
}
