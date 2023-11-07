import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PageTitleComponent } from 'src/app/components/page-title/page-title.component';

@Component({
  standalone: true,
  imports: [CommonModule, IonicModule, PageTitleComponent],
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {}
