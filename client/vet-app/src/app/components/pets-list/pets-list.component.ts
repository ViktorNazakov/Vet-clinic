import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ModalService } from 'src/app/services/modal.service';
import { Pet } from 'src/app/models/user.models';
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
  constructor(private mService: ModalService) {}

  addPet() {
    this.mService.modalCreatePet();
  }
}
