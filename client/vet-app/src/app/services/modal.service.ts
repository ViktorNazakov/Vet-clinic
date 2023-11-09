import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPetComponent } from '../components/add-pet/add-pet.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Pet } from '../models/user.models';
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
  modalEditPet = (pet: Pet) => {
    this.clearAll();
    const tempModal = this.dService.open(AddPetComponent, {
      header: `Editing ${pet.name}`,
      data: { pet },
    });
  };
}
