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
import { Appointment, Pet, User } from 'src/app/models/user.models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminActions } from 'src/app/store/actions/admin.actions';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TabViewModule,
    PetsListComponent,
    AppointmentsListComponent,
  ],
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
})
export class ProfileContainerModal implements OnInit {
  @Input() fromAdmin?: boolean;
  @Input() userDetails?: User;
  @Input() pets!: Pet[];
  @Input() visits!: Appointment[];
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
    private _config: DynamicDialogConfig,
    private _self: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    if (this._config.data) {
      if (this._config.data.admin) {
        this.fromAdmin = true;
      }
      if (!!this._config.data?.user) {
        this.userDetails = this._config?.data?.user;
      }
      if (!!this._config.data.pets) {
        this.pets = this._config.data.pets;
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
  deleteProfile() {
    this.mService
      .modalConfirm(
        `Do you want to delete ${this.userDetails?.fname} ${this.userDetails?.lname} 's account. This action is irreversible`
      )
      .pipe(first())
      .subscribe((res) => {
        if (res) {
          if (!!this.userDetails?.id || !!this.userDetails?.userId) {
            this.store.dispatch(
              AdminActions.deleteUserAttempt({
                id: (this.userDetails?.id || this.userDetails?.userId) + '',
              })
            );
          }
        }
      });
  }
  submitChanges() {
    const value = this.editForm.value;
    if (this.editForm.valid) {
      this.mService
        .modalConfirm('Are you sure you want to save these changes')
        .pipe(first())
        .subscribe((val) => {
          if (val) {
            this.store.dispatch(
              AdminActions.editUserAttempt({
                fname: this.editForm.value.fname || undefined,
                lname: this.editForm.value.fname || undefined,
                phoneNumber: this.editForm.value.phone || undefined,
                id: this.userDetails?.id || this.userDetails?.userId,
              })
            );
            this.editForm.reset();
            this.editMode = false;
          }
        });
    }
  }
}
