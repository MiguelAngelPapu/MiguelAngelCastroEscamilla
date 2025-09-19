import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../../components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from "../../../components/button-primary/button-primary.component";
import { productIdUniqueValidator, releaseDateValidator } from '../../../../core/validators/validators';
import { FORM_ERROR_MESSAGES } from '../../../../core/constants/form-errors';


@Component({
  selector: 'app-add-product',
  imports: [InputPrimaryComponent, ReactiveFormsModule, ButtonPrimaryComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  private formBuilder = inject(FormBuilder);

  // Formulario reactivo
  form = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [productIdUniqueValidator()]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_relese: [new Date().toISOString().split('T')[0], [Validators.required, releaseDateValidator.bind(this)]],
    date_revision: [{ value: '', disabled: true }, [Validators.required]]
  });

  // Señales y cálculos de fechas
  releaseDateSignal = signal(this.form.get('date_relese')?.value);
  revisionDateComputed = computed(() => {
    const release = this.releaseDateSignal();
    if (!release) return '';
    const revision = new Date(release);
    revision.setFullYear(revision.getFullYear() + 1);
    return revision.toISOString().split('T')[0];
  });
  initializeRevisionDate = (() => {
    // Inicializa el valor de la fecha de revisión
    this.form.get('date_revision')?.setValue(this.revisionDateComputed());

    // Actualiza la fecha de revisión cuando cambia la fecha de liberación
    this.form.get('date_relese')?.valueChanges.subscribe(newReleaseDate => {
      this.releaseDateSignal.set(newReleaseDate);
      this.form.get('date_revision')?.setValue(this.revisionDateComputed());
    });
  })();

  // Mensajes de error
  getFormErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control?.errors) return '';
    const firstErrorKey = Object.keys(control.errors)[0];
    return FORM_ERROR_MESSAGES[controlName]?.[firstErrorKey] || '';
  }

  onSubmit(): void {
    if (this.form.invalid) return
    const productData = this.form.getRawValue(); // obtienes valores, incluyendo campos deshabilitados
    console.log('Formulario válido, datos:', productData);
  }

  reset(): void {
    this.form.reset();
  }
}