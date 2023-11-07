import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbModule],
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  @Input() title: string = '';
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/home' };
  @Input() breadcrumbs: MenuItem[] = [];
  ngOnInit(): void {
    if (this.breadcrumbs.length <= 0) {
      this.breadcrumbs.push({ label: this.title });
    }
  }
}
