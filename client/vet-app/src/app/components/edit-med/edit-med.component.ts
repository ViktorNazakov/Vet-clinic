import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-med',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.scss'],
})
export class EditMedComponent implements OnInit {
  editMode = false;
  editId!: string;
  medForm = this.fBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    type: ['', [Validators.required, Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    quantity: ['', [Validators.required, Validators.min(0)]],
  });
  constructor(
    private fBuilder: FormBuilder,
    private _self: DynamicDialogRef,
    private _config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    if (this._config?.data) {
      this.editMode = this._config.data.edit || false;
      if (this._config.data?.med) {
        this.editId = this._config.data?.med?.id;
        this.medForm.patchValue({ ...this._config.data.med });
      }
    }
  }
  submitMed() {
    if (this.medForm.valid) {
      this._self.close({
        success: true,
        med: {
          id: this.editId || undefined,
          ...this.medForm.value,
        },
      });
    } else {
      this._self.close();
    }
  }
}
