import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { Appointment } from 'src/app/models/user.models';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [CommonModule, DataViewModule, RouterModule],
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.scss'],
})
export class AppointmentsListComponent {
  @Input() canCreate: boolean = true;
  @Input() appointments!: (Appointment | number)[];

  _appointments: (Appointment | number)[] = [];

  constructor(private router: Router) {}

  addAppointment = () => {
    this.router.navigate(['/appointment']);
  };
}
