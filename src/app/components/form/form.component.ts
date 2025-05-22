import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Validierung für das Geburtsdatum
// Das Geburtsdatum muss in der Vergangenheit liegen
function pastDateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  const selected = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today ? { futureDate: true } : null;
}

export interface Country { code: string; name: string; }

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  readonly countries$: Observable<Country[]> = this.http
    .get('/data/countries.csv', { responseType: 'text' })
    .pipe(
      map(text =>
        text
          .split(/\r?\n/)          // Zeilen trennen
          .filter(Boolean)         // leere Zeilen raus
          .map(line => {
            const [code, name] = line.split(';');
            return { code, name };
          })
      )
    );

  readonly form = this.fb.group({
    salutation: ['', Validators.required],
    firstName : ['', Validators.required],
    lastName  : ['', Validators.required],
    birthDate : ['', [Validators.required, pastDateValidator]],
    address   : [''],
    zip       : ['', Validators.pattern(/^\d{5}$/)],
    city      : [''],
    country   : ['', Validators.required]
  });
    
  /** Submit-Handler */
  onSubmit(): void {
    if (this.form.valid) {
      alert('Erfolgreich gesendet:\n' + JSON.stringify(this.form.value, null, 2));
      this.form.reset();
    } else {
      // alle Controls als "touched" markieren, damit die Validierungsfehler angezeigt werden
      this.form.markAllAsTouched();
    }
  }

  // Convenience-Getter
  c(name: keyof typeof this.form.controls) {
    return this.form.get(name)!;
  }
}
