import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product.service';
import { CreateProductDto } from '../domain/models/product.model';
import { FormBuilder, Validators } from '@angular/forms';
import { nextRevisionDate, productIdUniqueValidator, releaseDateValidator } from '../../../shared/core/validators/validators';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AddProductFacade {
    private formBuilder = inject(FormBuilder);
    private productService = inject(ProductService);

    // Formulario reactivo
    form = this.formBuilder.group({
        id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [productIdUniqueValidator(this.productService)]],
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        logo: ['', Validators.required],
        date_release: [new Date().toISOString().split('T')[0], [Validators.required, releaseDateValidator.bind(this)]],
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

    async save() {
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
        
        return await firstValueFrom(this.productService.addProduct(productPayload));
   
    }
    reset(): void {
        this.form.get('id')?.reset();
        this.form.get('name')?.reset();
        this.form.get('description')?.reset();
        this.form.get('logo')?.reset();
        this.form.get('date_release')?.setValue(new Date().toISOString().split('T')[0])
    }

}