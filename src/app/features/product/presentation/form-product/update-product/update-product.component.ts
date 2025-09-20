import { Component, inject, OnInit, signal } from '@angular/core';
import { InputPrimaryComponent } from "../../../../../shared/components/input-primary/input-primary.component";
import { ButtonPrimaryComponent } from "../../../../../shared/components/button-primary/button-primary.component";

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { getFormErrorMessage } from '../../../../../shared/core/validators/validators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, timer } from 'rxjs';
import { ToastPrimaryComponent } from "../../../../../shared/components/toast-primary/toast-primary.component";
import { UpdateProductFacade } from '../../../application/facades/update-product.facade';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, InputPrimaryComponent, ButtonPrimaryComponent, ToastPrimaryComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent implements OnInit {
  facade = inject(UpdateProductFacade);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  successMessage = signal<string | undefined>(undefined);
  isSuccess = signal<boolean>(true);
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

      if (!response) return;
      if ('status' in response) this.isSuccess.set(false);
      this.successMessage.set(response?.message)



      timer(3500)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.successMessage.set('');
          this.isSuccess.set(true);
        });

    })
    this.facade.cancelEditMode();
  }
}
