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
  getUserPets,
  getUserPetsLoading,
} from 'src/app/store/selectors/profile.selectors';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    IonicModule,
    TabViewModule,
    PetsListComponent,
    AppointmentsListComponent,
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userDetails = this.store.select(getProfileDetails);
  pets = this.store.select(getUserPets);
  loaded = this.store.select(getProfileFullLoad);
  ionViewWillEnter() {
    this.store.dispatch(ProfileActions.loadAttempt());
  }
  constructor(private store: Store) {}
}
