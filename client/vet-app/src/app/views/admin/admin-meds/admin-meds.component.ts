import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { first } from 'rxjs';
import { Medicament } from 'src/app/models/user.models';
import { ModalService } from 'src/app/services/modal.service';
import { AdminActions } from 'src/app/store/actions/admin.actions';
import {
  getAdminMedsList,
  getAdminMedsLoaded,
} from 'src/app/store/selectors/admin.selectors';

@Component({
  selector: 'app-admin-meds',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ButtonModule],
  templateUrl: './admin-meds.component.html',
  styleUrls: ['./admin-meds.component.scss'],
})
export class AdminMedsComponent implements OnInit {
  editMode = false;
  deleteMode = false;
  meds = this.store.select(getAdminMedsList);
  loaded = this.store.select(getAdminMedsLoaded);
  constructor(private store: Store, private mService: ModalService) {}
  ngOnInit(): void {
    this.store.dispatch(AdminActions.loadMedsAttempt());
  }
  initCreateMed() {
    this.mService
      .modalEditMed(true)
      .pipe(first())
      .subscribe((res) => {
        if (res?.success) {
          if (!!res?.med) {
            this.store.dispatch(
              AdminActions.createMedAttempt({ med: res.med })
            );
          }
        }
      });
  }
  editMed(val: Medicament) {
    this.mService
      .modalEditMed(false, val)
      .pipe(first())
      .subscribe((res) => {
        if (res?.success) {
          if (!!res?.med) {
            this.store.dispatch(AdminActions.editMedAttempt({ med: res.med }));
          }
        }
      });
  }
  deleteMed(val: Medicament) {
    this.mService
      .modalConfirm(
        `Are you sure you want to delete ${val.name}. This Action is irreversible !`
      )
      .pipe(first())
      .subscribe((acc) => {
        if (acc) {
          this.store.dispatch(AdminActions.deleteMedAttempt({ med: val }));
        }
      });
    console.log(val);
  }
  swapMode(mode: 'delete' | 'edit') {
    if (mode === 'delete') {
      this.editMode = false;
      this.deleteMode = !this.deleteMode;
    }
    if (mode === 'edit') {
      this.deleteMode = false;
      this.editMode = !this.editMode;
    }
  }
}
