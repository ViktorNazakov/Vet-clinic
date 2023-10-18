import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPetComponent } from '../components/add-pet/add-pet.component';
@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dService: DialogService) {}
  private clearAll = () => {
    this.dService.dialogComponentRefMap.forEach((item) => item.destroy());
  };
  modalCreatePet = () => {
    this.clearAll();
    const tempModal = this.dService.open(AddPetComponent, {
      header: 'Add new pet',
    });
  };
  modalEditPet = () => {};
}
