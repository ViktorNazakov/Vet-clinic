import { CommonModule } from '@angular/common';
import { Component, ComponentRef, Input, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TabViewModule } from 'primeng/tabview';
import { BehaviorSubject, first } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { PetsListComponent } from '../pets-list/pets-list.component';
import { AppointmentsListComponent } from '../appointments-list/appointments-list.component';
import { Pet, User } from 'src/app/models/user.models';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TabViewModule,
    // PetsListComponent,
    AppointmentsListComponent,
  ],
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
})
export class ProfileContainerModal implements OnInit {
  @Input() fromAdmin?: boolean;
  @Input() userDetails?: User;
  @Input() pets!: Pet[];
  @Input() loaded!: boolean;
  @Output() onEdit: BehaviorSubject<{
    fname?: string;
    lname?: string;
    phone?: string;
  }> = new BehaviorSubject({});
  editForm = this.fBuilder.group({
    fname: ['', [Validators.required, Validators.minLength(4)]],
    lname: ['', [Validators.required, Validators.minLength(4)]],
    phone: [''],
  });
  editMode = false;

  constructor(
    private store: Store,
    private fBuilder: FormBuilder,
    private mService: ModalService,
    private _config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    if (this._config.data) {
      for (const key in this._config.data) {
        this.fromAdmin = true;
        this.userDetails = this._config?.data?.user;
      }
    }
  }
  ionViewWillEnter() {
    this.store.dispatch(ProfileActions.loadAttempt());
  }
  swapEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editForm.patchValue({
        fname: this.userDetails?.fname,
        lname: this.userDetails?.lname,
        phone: this.userDetails?.phoneNumber,
      });
    } else {
      this.editForm.reset();
    }
  }
  submitChanges() {
    const value = this.editForm.value;
    if (this.editForm.valid) {
      this.mService
        .modalConfirm('Are you sure you want to save these changes')
        .pipe(first())
        .subscribe((val) => {
          if (val) {
            this.onEdit.next({
              fname: value.fname || undefined,
              lname: value.lname || undefined,
              phone: value.phone || undefined,
            });
            this.editForm.reset();
            this.editMode = false;
          }
        });
    }
  }
}
