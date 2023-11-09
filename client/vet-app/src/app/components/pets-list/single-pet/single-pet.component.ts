import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from 'src/app/models/user.models';
import { Store } from '@ngrx/store';
import { ModalService } from 'src/app/services/modal.service';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { first } from 'rxjs';

@Component({
  selector: 'app-single-pet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-pet.component.html',
  styleUrls: ['./single-pet.component.scss'],
})
export class SinglePetComponent {
  @Input() pet!: Pet;
  @Input() canEdit = false;
  constructor(private store: Store, private mService: ModalService) {}
  editPet(pet: Pet) {
    this.mService.modalEditPet(pet);
  }
  deletePet(name: string, id: string) {
    this.mService
      .modalConfirm(
        `Are you sure you want to remove ${name}. This action is irreversible`
      )
      .pipe(first())
      .subscribe((close) => {
        if (close) {
          this.store.dispatch(ProfileActions.deletePet({ petId: id }));
        }
      });
  }
}
