import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { nextRevisionDate, productIdUniqueValidator, releaseDateValidator } from '../../../shared/core/validators/validators';
import { firstValueFrom } from 'rxjs';
import { CreateProductDto } from '../domain/models/product.model';

@Injectable({
    providedIn: 'root'
})

export class UpdateProductFacade {
    private formBuilder = inject(FormBuilder);
    private productService = inject(ProductService);
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
        return nextRevisionDate(this.releaseDateSignal());
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

    async update() {
        if (this.form.invalid) return

        const productData = this.form.getRawValue();
        const productPayload: CreateProductDto = {
            id: productData.id ?? '',
            name: productData.name ?? '',
            description: productData.description ?? '',
            logo: productData.logo ?? '',
            date_release: new Date(productData.date_release!).toISOString(),
            date_revision: new Date(productData.date_revision!).toISOString(),
        };

        return await firstValueFrom(this.productService.updateProduct(productPayload.id, productPayload));

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