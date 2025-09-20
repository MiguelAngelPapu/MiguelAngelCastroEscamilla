import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { InputPrimaryComponent } from "../../../../../shared/components/input-primary/input-primary.component";
import { ButtonPrimaryComponent } from "../../../../../shared/components/button-primary/button-primary.component";
import { AddProductFacade } from '../../../application/add-product.facade';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { getFormErrorMessage, releaseDateValidator } from '../../../../../shared/core/validators/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../application/product.service';
import { firstValueFrom } from 'rxjs';
import { MyProduct } from '../../../domain/models/product.model';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, InputPrimaryComponent, ButtonPrimaryComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  facade = inject(AddProductFacade);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private productService = inject(ProductService);
  disabled = signal<boolean>(true);
  isEditMode = signal(false);


  // Formulario reactivo
  form = this.formBuilder.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: [{ value: '', disabled: true }, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: [{ value: '', disabled: true }, Validators.required],
    date_release: [{ value: new Date().toISOString().split('T')[0], disabled: true }, [Validators.required, releaseDateValidator.bind(this)]],
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

  ngOnInit(): void {
    // Bloque 1: cuando cambia la URL → actualizar el input
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const idControl = this.form.get('id');

      if (id && id !== idControl?.value) {
        idControl?.setValue(id, { emitEvent: false });
      }
      // Bloque 3: 
      this.getProductById(id!);
    });

    // Bloque 2: cuando cambia el input → actualizar la URL
    this.form.get('id')?.valueChanges.subscribe(newId => {

      if (newId) {
        this.router.navigate(['/form-product', 'edit', newId], { replaceUrl: true });
      }
    });


  }
  // Bloque 3: cuando cambia el input válido → traer datos del producto
  async getProductById(id: string) {
    if (await firstValueFrom(this.productService.verificationProduct(id))) {
      const products = await firstValueFrom(this.productService.getAllProducts());
      const product = products.find(product => product.id === id);
      if (product) {
        this.form.patchValue({
          name: product.name,
          description: product.description,
          logo: product.logo,
          date_release: new Date(product.date_releas).toISOString().split('T')[0]
        });
      }
    } else {
      this.reset();
    }
  }


  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }

  onSubmit() {
    const productData = this.form.getRawValue();

    const productPayload: MyProduct = {
      id: productData.id ?? '',              // convierte null a string vacío
      name: productData.name ?? '',
      description: productData.description ?? '',
      logo: productData.logo ?? '',
      date_release: new Date(productData.date_release!).toISOString(),
      date_revision: new Date(productData.date_revision!).toISOString(),
    };
    this.productService.updateProduct(productPayload.id ,productPayload).subscribe(products => {
      console.log(products)
    });
  }

  reset(): void {
    this.form.get('name')?.reset();
    this.form.get('description')?.reset();
    this.form.get('logo')?.reset();
    this.form.get('date_release')?.setValue(new Date().toISOString().split('T')[0])
  }

  enableEditMode(): void {
    this.isEditMode.set(true);

    // Deshabilitar ID
    this.form.get('id')?.disable();

    // Habilitar el resto de campos
    this.form.get('name')?.enable();
    this.form.get('description')?.enable();
    this.form.get('logo')?.enable();
    this.form.get('date_release')?.enable();
  }

  cancelEditMode(): void {
    this.isEditMode.set(false);

    // Habilitar ID
    this.form.get('id')?.enable();

    // Deshabilitar el resto de campos
    this.form.get('name')?.disable();
    this.form.get('description')?.disable();
    this.form.get('logo')?.disable();
    this.form.get('date_release')?.disable();
    this.form.get('date_revision')?.disable();
  }
}
