import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptor/headers.interceptor';
import { catchErrorInterceptor } from './core/interceptor/catch-error.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideHttpClient(
      withInterceptors([
        headersInterceptor,
        catchErrorInterceptor,
        loadingInterceptor,
      ])
    ), //it takes withFetch()
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    provideToastr(),
  ],
};
