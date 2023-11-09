import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { pageTransition } from './fade.transition';
import { InitialService } from './services/intial.service';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, ToastModule],
})
export class AppComponent implements AfterViewInit {
  transtion = pageTransition;
  constructor(private initService: InitialService) {}
  ngAfterViewInit() {
    this.initService.initialize();
  }
}
