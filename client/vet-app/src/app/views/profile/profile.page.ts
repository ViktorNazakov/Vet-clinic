import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { TabViewModule } from 'primeng/tabview';
import { AppointmentsListComponent } from 'src/app/components/appointments-list/appointments-list.component';
import {
  getProfileDetails,
  getProfileFullLoad,
  getProfileUser,
  getUserPets,
  getUserVisits,
} from 'src/app/store/selectors/profile.selectors';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs';
import { ProfileContainerComponent } from 'src/app/components/profile-container/profile-container.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    IonicModule,
    TabViewModule,
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
  visits = this.store.select(getUserVisits);
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
        if (data.id)
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
