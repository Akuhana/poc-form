import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { pastDateValidator } from '../../utils/date.validator';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private countryService = inject(CountryService);

  // Automatisch aus dem Service die Länder laden
  readonly countries$ = this.countryService.getCountries();

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
    
  // Submit-Handler
  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigate(['/summary'], {
        state: { formData: this.form.value }
      });
      this.form.reset();
    } else {
      // alle Controls als "touched" markieren, damit die Validierungsfehler angezeigt werden
      this.form.markAllAsTouched();
    }
  }

  // Convenience-Getter für die FormControls
  c(name: keyof typeof this.form.controls) {
    return this.form.get(name)!;
  }
}
