import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validierung für das Geburtsdatum
// Das Geburtsdatum muss in der Vergangenheit liegen
export function pastDateValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  const selected = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selected >= today ? { futureDate: true } : null;
}
