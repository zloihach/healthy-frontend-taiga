import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { TuiRootModule } from "@taiga-ui/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from "./core/auth/auth.interceptor";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { mainReducer } from './shared/states/reducers/main.reducer';
import { MainEffects } from './shared/states/effects/main.effects';
import { BrowserModule } from "@angular/platform-browser";
import {TuiTabsModule} from "@taiga-ui/kit";
import {DateRuPipe} from "./shared/pipes/date-ru.pipe";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(
      TuiRootModule,
      HttpClientModule,
      BrowserModule,
      StoreModule.forRoot({ vaccineState: mainReducer }),
      EffectsModule.forRoot([MainEffects]),
      StoreDevtoolsModule.instrument({ maxAge: 25 }),
      TuiRootModule,
      TuiTabsModule,
      DateRuPipe
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
};
