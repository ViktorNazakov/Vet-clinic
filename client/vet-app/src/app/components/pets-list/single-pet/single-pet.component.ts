import { Component, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Pet } from 'src/app/models/user.models';
import { BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-single-pet',
  standalone: true,
  imports: [NgIf],
  templateUrl: './single-pet.component.html',
  styleUrls: ['./single-pet.component.scss'],
})
export class SinglePetComponent {
  @Output() onDelete = new Subject<{ name: string; id: string }>();
  @Output() onEdit = new Subject<{ pet: Pet }>();
  @Input() pet!: Pet;
  @Input() canEdit = false;
  constructor() {}
  editPet(pet: Pet) {
    this.onEdit.next({ pet });
  }
  deletePet(name: string, id: string) {
    this.onDelete.next({ name, id });
  }
}
