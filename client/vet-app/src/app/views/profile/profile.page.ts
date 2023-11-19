import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { TabViewModule } from 'primeng/tabview';
import { PetsListComponent } from 'src/app/components/pets-list/pets-list.component';
import { AppointmentsListComponent } from 'src/app/components/appointments-list/appointments-list.component';
import {
  getProfileDetails,
  getProfileFullLoad,
  getProfileUser,
  getUserPets,
  getUserPetsLoading,
} from 'src/app/store/selectors/profile.selectors';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ProfileContainerComponent } from 'src/app/components/profile-container/profile-container.component';
import { User } from 'src/app/models/user.models';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    IonicModule,
    TabViewModule,
    PetsListComponent,
    AppointmentsListComponent,
    ReactiveFormsModule,
    ProfileContainerComponent,
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userDetails = this.store.select(getProfileUser);
  pets = this.store.select(getUserPets);
  loaded = this.store.select(getProfileFullLoad);
  constructor(private store: Store, private fBuilder: FormBuilder) {}

  ionViewWillEnter() {
    this.store.dispatch(ProfileActions.loadAttempt());
  }
  submitChanges(val: { fname?: string; lname?: string; phone?: string }) {
    this.store
      .select(getProfileDetails)
      .pipe(first())
      .subscribe((data) => {
        this.store.dispatch(
          ProfileActions.editAttempt({
            userId: data.id,
            fname: !!val.fname ? val.fname : undefined,
            lname: !!val.lname ? val.lname : undefined,
            phoneNumber: !!val.phone ? val.phone : undefined,
          })
        );
      });
  }
}
