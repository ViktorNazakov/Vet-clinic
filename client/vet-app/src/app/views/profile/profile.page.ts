import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { TabViewModule } from 'primeng/tabview';
import { PetsListComponent } from 'src/app/components/pets-list/pets-list.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PageTitleComponent,
    IonicModule,
    TabViewModule,
    PetsListComponent,
  ],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  ionViewWillEnter() {
    this.store.dispatch(ProfileActions.loadAttempt());
  }
  constructor(private store: Store) {}
}
