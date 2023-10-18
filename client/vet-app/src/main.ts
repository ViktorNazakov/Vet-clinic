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
import { DialogService } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    /** Required Services */
    DialogService,

    /** */
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({}),
      EffectsModule.forRoot([AuthEffects, ProfileEffects]),
      BrowserAnimationsModule
    ),
    provideStore({ AUTH: AuthReducer, PROFILE: ProfileReducer }),

    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true, // If set to true, the connection is established outside the Angular zone for better performance
    }),
    provideRouter(routes),
  ],
});
