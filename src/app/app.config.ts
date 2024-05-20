import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TuiRootModule } from "@taiga-ui/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from "./core/auth/auth.interceptor";
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { vaccineReducer } from './shared/states/reducers/vaccine.reducer';
import { VaccineEffects } from './shared/states/effects/vaccine.effects';
import { BrowserModule } from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(
      TuiRootModule,
      HttpClientModule,
      BrowserModule,
      StoreModule.forRoot({ vaccineState: vaccineReducer }),
      EffectsModule.forRoot([VaccineEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25 }),
      TuiRootModule,
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
};
