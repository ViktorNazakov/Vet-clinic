import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, DataViewModule],
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss']
})
export class AppointmentsListComponent {
  _appointments = Appointment[]
}
