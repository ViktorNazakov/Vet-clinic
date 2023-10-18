import { Component, Input, OnInit } from '@angular/core';
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
export class PetsListComponent implements OnInit {
  _pets: (Pet | number | undefined)[] = [];
  tempPet: Pet = {
    _id: 'wd1w',
    name: 'Chocho',
    specie: 'Dog - Pincher',
  };
  @Input() canCreate = false;
  @Input() set pets(val: (Pet | number | undefined)[]) {
    this._pets = [...val, this.tempPet, this.tempPet];
    if (this.canCreate && val.length < 5) {
      this._pets.push(1);
    }
  }
  constructor(private mService: ModalService) {}
  ngOnInit() {
    console.log('pets');
  }
  addPet() {
    this.mService.modalCreatePet();
  }
}
