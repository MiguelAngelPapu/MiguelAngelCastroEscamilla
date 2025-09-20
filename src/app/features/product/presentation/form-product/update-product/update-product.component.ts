import { Component, inject, OnInit, signal } from '@angular/core';
import { InputPrimaryComponent } from "../../../../../shared/components/input-primary/input-primary.component";
import { ButtonPrimaryComponent } from "../../../../../shared/components/button-primary/button-primary.component";

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { getFormErrorMessage } from '../../../../../shared/core/validators/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../application/product.service';
import { firstValueFrom, Subject, takeUntil, timer } from 'rxjs';
import { UpdateProductFacade } from '../../../application/update-product.facade';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, InputPrimaryComponent, ButtonPrimaryComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  facade = inject(UpdateProductFacade);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  successMessage = signal<string | undefined>(undefined);
  private destroy$ = new Subject<void>();



  ngOnInit(): void {
    // Bloque 1: cuando cambia la URL → actualizar el input
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const idControl = this.facade.form.get('id');

      if (id && id !== idControl?.value) {
        idControl?.setValue(id, { emitEvent: false });
      }
      // Bloque 3: 
      this.facade.getProductById(id!);
    });

    // Bloque 2: cuando cambia el input → actualizar la URL
    this.facade.form.get('id')?.valueChanges.subscribe(newId => {

      if (newId) {
        this.router.navigate(['/form-product', 'edit', newId], { replaceUrl: true });
      }
    });

  }
  


  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }

  onSubmit() {
    this.facade.update().then(response => {

      this.successMessage.set(response?.message);

      timer(2500)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.successMessage.set('');
        });

    })
    this.facade.cancelEditMode();
  }
}
