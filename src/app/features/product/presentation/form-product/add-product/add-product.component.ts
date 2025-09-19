import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../../../../shared/components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from '../../../../../shared/components/button-primary/button-primary.component';
import { getFormErrorMessage, productIdUniqueValidator, releaseDateValidator } from '../../../../../shared/core/validators/validators';
import { AddProductFacade } from '../../../application/add-product.facade';
import { MyProduct } from '../../../domain/models/product.model';

@Component({
  selector: 'add-product',
  imports: [InputPrimaryComponent, ReactiveFormsModule, ButtonPrimaryComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  facade = inject(AddProductFacade);
  private formBuilder = inject(FormBuilder);

  // Formulario reactivo
  form = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [productIdUniqueValidator()]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: [new Date().toISOString().split('T')[0], [Validators.required, releaseDateValidator.bind(this)]],
    date_revision: [{ value: '', disabled: true }, [Validators.required]]
  });

  // Señales y cálculos de fechas
  releaseDateSignal = signal(this.form.get('date_release')?.value);
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
    this.form.get('date_release')?.valueChanges.subscribe(newReleaseDate => {
      this.releaseDateSignal.set(newReleaseDate);
      this.form.get('date_revision')?.setValue(this.revisionDateComputed());
    });
  })();

  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }

  onSubmit(): void {
    if (this.form.invalid) return
    const productData = this.form.getRawValue();
    
    const productPayload: MyProduct= {
      id: productData.id ?? '',              // convierte null a string vacío
      name: productData.name ?? '',
      description: productData.description ?? '',
      logo: productData.logo ?? '',
      date_release: new Date(productData.date_release!).toISOString(),
      date_revision: new Date(productData.date_revision!).toISOString(),
    };
    this.facade.saveProduct(productPayload);
    this.reset();
  }

  reset(): void {
    this.form.reset();
  }
}

