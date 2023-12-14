import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideStore } from '@ngrx/store';
import {
  StoreDevtoolsModule,
  provideStoreDevtools,
} from '@ngrx/store-devtools';
import { AuthReducer } from './app/store/reducers/auth.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/store/effects/auth.effects';
import { ProfileReducer } from './app/store/reducers/profile.reducer';
import { ProfileEffects } from './app/store/effects/profile.effects';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { DataReducer } from './app/store/reducers/data.reducer';
import { DataEffects } from './app/store/effects/data.effects';
import { ErrorInterceptor } from './app/interceptors/error.interceptor';
import { MessageService } from 'primeng/api';
import { AdminReducer } from './app/store/reducers/admin.reducer';
import { AdminEffects } from './app/store/effects/admin.effects';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    /** Required Services */
    DialogService,
    MessageService,
    DynamicDialogConfig,
    /** */
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({}),
      EffectsModule.forRoot([
        AuthEffects,
        ProfileEffects,
        DataEffects,
        AdminEffects,
      ]),
      BrowserAnimationsModule
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    provideStore({
      AUTH: AuthReducer,
      PROFILE: ProfileReducer,
      DATA: DataReducer,
      ADMIN: AdminReducer,
    }),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open

      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true, // If set to true, the connection is established outside the Angular zone for better performance
    }),
    provideRouter(routes),
  ],
});
