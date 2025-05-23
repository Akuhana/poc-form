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

  // 110 Jahre zurückrechnen
  const maxPast = new Date(today);
  maxPast.setFullYear(maxPast.getFullYear() - 110);

  const errors: ValidationErrors = {};

  if (selected >= today) {
    errors['futureDate'] = true;
  }
  if (selected < maxPast) {
    errors['tooOld'] = true;
  }

  // Wenn es mindestens ein Flag gibt, Fehlerobjekt zurückgeben, sonst null
  return Object.keys(errors).length ? errors : null;
}
