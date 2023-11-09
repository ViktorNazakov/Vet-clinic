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
  @Input() set appointments(val: (Appointment | number)[]) {
    this._appointments = [...val, this.temp, this.temp];
    if (this.canCreate && val.length < 5) {
      this._appointments.push(1);
    }
  }

  _appointments: (Appointment | number)[] = [];
  temp: Appointment = {
    id: '2314234',
    doctor: 'Dr. John Stevens',
    time: new Date(),
  };

  constructor(private router: Router) {}

  addAppointment = () => {
    this.router.navigate(['/appointment']);
  };
}
