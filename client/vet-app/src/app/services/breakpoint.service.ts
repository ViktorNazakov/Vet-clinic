import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  activeBreakpoint = new BehaviorSubject<string>('');
  constructor() {}
}
