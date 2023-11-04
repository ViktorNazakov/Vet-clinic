import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ModalService } from 'src/app/services/modal.service';
import { Pet } from 'src/app/models/user.models';
import { Store } from '@ngrx/store';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { first } from 'rxjs';
@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [CommonModule, DataViewModule],
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
})
export class PetsListComponent {
  tempPet: Pet = {
    _id: 'wd1w',
    name: 'Chocho',
    specie: 'Dog - Pincher',
  };
  @Input() loading!: number;
  @Input() canCreate = false;
  @Input() pets!: Pet[];
  constructor(private mService: ModalService, private store: Store) {}

  addPet() {
    this.mService.modalCreatePet();
  }
  deletePet(petName: string, petId: string) {
    this.mService
      .modalConfirm(
        `Are you sure you want to remove ${petName}. This action is irreversible`
      )
      .pipe(first())
      .subscribe((close) => {
        if (close) {
          this.store.dispatch(ProfileActions.deletePet({ petId }));
        }
      });
  }
}
