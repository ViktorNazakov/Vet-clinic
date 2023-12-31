import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  message = 'Placeholder...';
  showAccept = true;
  constructor(
    private _config: DynamicDialogConfig,
    private _self: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    this.message = this._config.data?.message || ' ';
    this.showAccept =
      this._config.data?.accept !== undefined
        ? this._config.data?.accept
        : true;
  }
  close() {
    this._self.close();
  }
  accept() {
    this._self.close(true);
  }
}
