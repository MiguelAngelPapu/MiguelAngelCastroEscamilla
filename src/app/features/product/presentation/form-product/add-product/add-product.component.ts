import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputPrimaryComponent } from '../../../../../shared/components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from '../../../../../shared/components/button-primary/button-primary.component';
import { getFormErrorMessage } from '../../../../../shared/core/validators/validators';
import { AddProductFacade } from '../../../application/add-product.facade';
import { CreateProductDto } from '../../../domain/models/product.model';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'add-product',
  imports: [InputPrimaryComponent, ReactiveFormsModule, ButtonPrimaryComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  facade = inject(AddProductFacade);
  successMessage = signal<string | undefined>(undefined);
  private destroy$ = new Subject<void>();

  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }

  onSubmit(): void {
    this.facade.save().then(response => {

      this.successMessage.set(response?.message);

      timer(2500)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.successMessage.set('');
        });

    })
    this.facade.reset();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

