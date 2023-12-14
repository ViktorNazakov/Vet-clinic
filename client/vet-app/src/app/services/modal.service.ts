import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPetComponent } from '../components/add-pet/add-pet.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { Medicament, Pet, User } from '../models/user.models';
import { ProfileContainerModal } from '../components/profile-container/profile-modal.component';
import { EditMedComponent } from '../components/edit-med/edit-med.component';
@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private dService: DialogService) {}
  private clearAll = () => {
    this.dService.dialogComponentRefMap.forEach((item) => item.destroy());
  };
  modalEditMed = (add: boolean, med?: Medicament) => {
    this.clearAll();
    const tempModal = this.dService.open(EditMedComponent, {
      dismissableMask: false,
      data: {
        edit: !add,
        med,
      },
    });
    return tempModal.onClose;
  };
  modalViewProfile = (user: User, pets?: Pet[]) => {
    this.clearAll();
    const tempModal = this.dService.open(ProfileContainerModal, {
      dismissableMask: true,
      styleClass: 'profile-modal',
      data: {
        admin: true,
        user,
        pets,
      },
    });
  };

  modalConfirm = (message?: string, showAccept?: boolean) => {
    this.clearAll();
    const tempModal = this.dService.open(ConfirmDialogComponent, {
      closable: false,
      data: {
        accept: showAccept,
        message,
      },
    });
    return tempModal.onClose;
  };
}
