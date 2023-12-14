import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Pet } from '../models/user.models';
import { AddPetComponent } from '../components/add-pet/add-pet.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class PetModalService {
  private clearAll = () => {
    this.dService.dialogComponentRefMap.forEach((item) => item.destroy());
  };
  constructor(private dService: DialogService) {}
  modalEditPet = (pet: Pet) => {
    this.clearAll();
    const tempModal = this.dService.open(AddPetComponent, {
      header: `Editing ${pet.name}`,
      data: { pet },
    });
    return tempModal.onClose;
  };
  modalCreatePet = () => {
    this.clearAll();
    const tempModal = this.dService.open(AddPetComponent, {
      header: 'Add new pet',
    });
    return tempModal.onClose;
  };
  modalConfirm = (message?: string) => {
    this.clearAll();
    const tempModal = this.dService.open(ConfirmDialogComponent, {
      closable: false,
      data: {
        message,
      },
    });
    return tempModal.onClose;
  };
}
