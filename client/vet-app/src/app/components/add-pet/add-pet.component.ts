import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { ProfileActions } from 'src/app/store/actions/profile.actions';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
  ],
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent {
  petForm = this.fBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    specie: ['', [Validators.required]],
    breed: ['', Validators.required],
  });
  speciesList = [
    {
      name: 'Dog',
      value: 'dog',
    },
    {
      name: 'Cat',
      value: 'cat',
    },
    {
      name: 'Rabbit',
      value: 'rabbit',
    },
  ];
  constructor(
    private store: Store,
    private fBuilder: FormBuilder,
    private _self: DynamicDialogRef
  ) {}
  createPet() {
    if (
      this.petForm.valid &&
      !!this.petForm.value.name &&
      !!this.petForm.value.breed &&
      !!this.petForm.value.specie
    ) {
      this._self.close();
      this.store.dispatch(
        ProfileActions.createPet({
          name: this.petForm.value.name,
          breed: this.petForm.value.breed,
          specie: this.petForm.value.specie,
        })
      );
      this.petForm.reset();
    }
  }
}
