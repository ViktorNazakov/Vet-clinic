import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ModalService } from 'src/app/services/modal.service';
import { Pet } from 'src/app/models/user.models';
import { Store } from '@ngrx/store';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { first } from 'rxjs';
import { SinglePetComponent } from './single-pet/single-pet.component';
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
  @Input() pets!: Pet[];
  constructor(private mService: ModalService, private store: Store) {}

  addPet() {
    this.mService.modalCreatePet();
  }
  deletePet(petName: string, petId: string) {}
}
