import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable, firstValueFrom } from 'rxjs';
import { inject } from '@angular/core';

export interface Country { code: string; name: string; }

// Service für die Länder, damit man die Lister der Länder nicht mehrmals laden muss
@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);

  // Liste aller Länder als Observable (einmal geladen, gecacht)
  private readonly countries$ = this.http
    .get('/data/countries.csv', { responseType: 'text' })
    .pipe(
      map(text =>
        text
          .split(/\r?\n/)
          .filter(Boolean)
          .map(line => {
            const [code, name] = line.split(';');
            return { code, name } as Country;
          })
        ),
        shareReplay(1) // Cache
    );

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }

  // HilfsLookup für den Ländernamen
  // Async, da die Liste erst geladen werden muss
  async lookupName(code: string): Promise<string> {
    const list = await firstValueFrom(this.countries$);
    return list.find(c => c.code === code)?.name ?? code;
  }
}