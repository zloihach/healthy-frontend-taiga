import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { TuiRootModule } from '@taiga-ui/core';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { routes } from "./app/app.routes";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { mainReducer } from "./app/shared/states/reducers/main.reducer";
import { provideEffects } from "@ngrx/effects";
import { MainEffects } from "./app/shared/states/effects/main.effects";
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
    provideStore({ vaccineState: mainReducer }),
    provideEffects([MainEffects]),
    provideStoreDevtools({ maxAge: 25 }),
  ],
}).catch(err => console.error(err));
