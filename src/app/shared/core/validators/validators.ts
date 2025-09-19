import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { FORM_ERROR_MESSAGES } from '../constants/form-errors';

// Validador asíncrono para ID único
export function productIdUniqueValidator(): AsyncValidatorFn {
    const existingProductIds = ['123', '456', '789'];
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (!control.value) return of(null);
        console.log(control.value)
        // Simular un delay como si consultara backend
        return of(control.value).pipe(
            delay(500),
            map(id => existingProductIds.includes(id) ? { idExists: true } : null)
        );
    };
}

// Validador de fecha de liberación
export function releaseDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const [year, month, day] = control.value.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day); // mes 0-indexado
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate >= today ? null : { invalidReleaseDate: true };
}

// Mensajes de error
export function getFormErrorMessage(control: FormControl): string {
  if (!control?.errors) return '';

  const firstErrorKey = Object.keys(control.errors)[0];

  // Optional chaining + null check para TypeScript
  const controlName = control.parent
    ? Object.keys(control.parent.controls).find(key => control.parent?.get(key) === control) ?? null
    : null;

  if (!controlName) return '';

  return FORM_ERROR_MESSAGES[controlName]?.[firstErrorKey] || '';
}