import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { pageTransition } from './fade.transition';
import { InitialService } from './services/intial.service';
import { ToastModule } from 'primeng/toast';
import { AdminTransition } from './views/admin/trasition.animations';
import { BreakpointService } from './services/breakpoint.service';
import { Observable, debounceTime, fromEvent, tap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, ToastModule],
})
export class AppComponent implements AfterViewInit, OnInit {
  transtion = pageTransition;
  resizeObserver!: Observable<any>;
  constructor(
    private initService: InitialService,
    private bpService: BreakpointService
  ) {}
  updateRes(res: number) {
    const tempRes = res;
    if (tempRes <= 768) {
      this.bpService.activeBreakpoint.next('SM');
    }
    if (tempRes > 768 && tempRes < 1400) {
      this.bpService.activeBreakpoint.next('MD');
    }
    if (tempRes >= 1400) {
      this.bpService.activeBreakpoint.next('LG');
    }
  }
  ngAfterViewInit() {
    this.resizeObserver = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      tap((res) => this.updateRes(window.innerWidth))
    );
    this.resizeObserver.subscribe();
    this.initService.initialize();
  }
  ngOnInit(): void {
    this.updateRes(window.innerWidth);
  }
}
