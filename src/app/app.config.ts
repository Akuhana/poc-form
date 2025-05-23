import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeDe       from '@angular/common/locales/de';
import localeDeExtra  from '@angular/common/locales/extra/de';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localeDe,  'de-DE', localeDeExtra);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), { provide: LOCALE_ID, useValue: 'de-DE' }]
};
