import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';

import { Pet } from 'src/app/models/user.models';
import { Store } from '@ngrx/store';
import { SinglePetComponent } from './single-pet/single-pet.component';
import { PetModalService } from 'src/app/services/pet.modal.service';
import { first } from 'rxjs/operators';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { AdminActions } from 'src/app/store/actions/admin.actions';
@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, SinglePetComponent],
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss'],
})
export class PetsListComponent {
  @Input() loading!: number;
  @Input() canCreate = false;
  @Input() fromAdmin: boolean = false;
  @Input() pets!: Pet[];
  constructor(private store: Store, private mService: PetModalService) {}
  addPet() {
    this.mService
      .modalCreatePet()
      .pipe(first())
      .subscribe((val: { success?: boolean; pet: Pet }) => {
        if (val?.success) {
          if (!!val.pet) {
            if (this.fromAdmin) {
            } else {
              this.store.dispatch(
                ProfileActions.createPet({
                  name: val.pet.name,
                  breed: val.pet.breed,
                  specie: val.pet.specie,
                })
              );
            }
          }
        }
      });
  }
  editPet(ev: { pet: Pet }) {
    this.mService
      .modalEditPet(ev.pet)
      .pipe(first())
      .subscribe((val: { success?: boolean; pet: Pet }) => {
        if (val?.success) {
          if (!!val.pet) {
            if (this.fromAdmin) {
              this.store.dispatch(
                AdminActions.editUserPetAttempt({
                  id: val.pet.id,
                  name: val.pet.name,
                  breed: val.pet.breed,
                  specie: val.pet.specie,
                })
              );
            } else {
              this.store.dispatch(
                ProfileActions.editPet({
                  petId: val.pet.id,
                  name: val.pet.name,
                  breed: val.pet.breed,
                  specie: val.pet.specie,
                })
              );
            }
          }
        }
      });
  }
  deletePet(ev: { name: string; id: string }) {
    this.mService
      .modalConfirm(
        `Are you sure you want to remove ${ev.name}. This action is irreversible`
      )
      .pipe(first())
      .subscribe((close) => {
        if (close) {
          this.store.dispatch(ProfileActions.deletePet({ petId: ev.id }));
        }
      });
  }
}
