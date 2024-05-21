import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { TuiRootModule } from '@taiga-ui/core';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { routes } from "./app/app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { vaccineReducer } from "./app/shared/states/reducers/vaccine.reducer";
import { provideEffects } from "@ngrx/effects";
import { VaccineEffects } from "./app/shared/states/effects/vaccine.effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    importProvidersFrom(
      TuiRootModule,
      BrowserAnimationsModule,
    ),
    provideStore({ vaccineState: vaccineReducer }),
    provideEffects([VaccineEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
}).catch(err => console.error(err));
