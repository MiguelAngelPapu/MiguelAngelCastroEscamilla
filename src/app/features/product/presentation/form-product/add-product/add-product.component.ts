import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputPrimaryComponent } from '../../../../../shared/components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from '../../../../../shared/components/button-primary/button-primary.component';
import { getFormErrorMessage } from '../../../../../shared/core/validators/validators';
import { AddProductFacade } from '../../../application/add-product.facade';
import { Subject, takeUntil, timer } from 'rxjs';
import { ToastPrimaryComponent } from "../../../../../shared/components/toast-primary/toast-primary.component";

@Component({
  selector: 'add-product',
  imports: [InputPrimaryComponent, ReactiveFormsModule, ButtonPrimaryComponent, ToastPrimaryComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  facade = inject(AddProductFacade);
  successMessage = signal<string | undefined>(undefined);
  isSuccess = signal<boolean>(true);
  private destroy$ = new Subject<void>();

  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }

  onSubmit(): void {
    this.facade.save().then(response => {
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
    this.facade.reset();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

