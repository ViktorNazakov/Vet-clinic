import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthAPIActions } from '../store/actions/auth.actions';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store, private mService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((res) => {
        const message =
          (Array.isArray(res?.error?.errors)
            ? res.error.errors[0]
            : undefined) ||
          res.error?.message ||
          res?.detail;
        const status = res.error?.status;
        if (!!message) {
          this.mService.add({
            severity: 'error',
            detail: message,
            summary: status ? status : 'ERROR',
          });
        }
        if (!!res.status) {
          if (res.status === 401 && !res?.message?.includes('auth/login')) {
            this.store.dispatch(AuthAPIActions.logoutAttempt());
          }
        }
        return throwError(() => new Error(res));
      })
    );
  }
}
