import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageService } from './storage.service';
import { AuthAPIActions } from '../store/actions/auth.actions';

@Injectable({ providedIn: 'root' })
export class InitialService {
  sliderInit = false;
  sliderFeaturesInit = false;
  initialize = () => {
    const token = this.sService.getToken();
    this.store.dispatch(
      AuthAPIActions.accountCheck({ token: token ? token : undefined })
    );
  };
  constructor(private store: Store, private sService: StorageService) {}
}
