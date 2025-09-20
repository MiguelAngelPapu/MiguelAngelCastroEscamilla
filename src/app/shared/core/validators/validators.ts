import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FORM_ERROR_MESSAGES } from '../constants/form-errors';
import { Product } from '../../../features/product/domain/models/product.model';
import { ProductService } from '../../../features/product/application/product.service';

// Validador asíncrono para ID único
export function productIdUniqueValidator(productService: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null); // sin valor, sin error
    }

    return productService.verificationProduct(control.value).pipe(
      map((exists: boolean) => (exists ? { idExists: true } : null)),
      catchError(() => of(null)) // si hay error en la API, no bloquea el form
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

// Validamos la cantidad de productos que hay para realizar la paginacion de [5, 10, 20 etc]
// si esta vacion devuelve [5]
export function calculatePaginationOptions(product: Product[]): number[] {

  const length = product.length ?? 0;
  const options = [];
  let currentOptionValue = 0;
  let i = 0;

  // Mientras el valor de la opción sea menor que el total de items,
  // sigue agregando opciones a la lista.
  while (currentOptionValue < length) {
    if (i === 0) {
      // La primera opción es siempre 5.
      currentOptionValue = 5;
    } else {
      // Las siguientes son 10, 20, 30...
      currentOptionValue = i * 10;
    }
    options.push(currentOptionValue);
    i++;
  }

  // Si no hay datos, asegúrate de que al menos la opción '5' exista.
  if (options.length === 0) {
    return [5];
  }
  return options;
}