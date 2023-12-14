import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminTransition } from './trasition.animations';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [AdminTransition],
})
export class AdminComponent {
  prepareRoute(route: any) {}
}
