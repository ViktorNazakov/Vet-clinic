import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { catchError, of, tap, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthAPIActions } from '../store/actions/auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sService: StorageService, private store: Store) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.sService.getToken();

    const authReq = authToken
      ? req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + authToken),
        })
      : req.clone();
    // send cloned request with header to the next handler.

    return next.handle(authReq);
  }
}
