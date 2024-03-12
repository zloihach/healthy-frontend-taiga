import {bootstrapApplication, provideClientHydration} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {TuiRootModule} from '@taiga-ui/core';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {importProvidersFrom} from "@angular/core";
import {routes} from "./app/app.routes";

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      TuiRootModule,
    ),
  ],
}).catch(err => console.error(err));
