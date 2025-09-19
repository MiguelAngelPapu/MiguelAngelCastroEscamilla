import { Component, ElementRef, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { ButtonPrimaryComponent } from "../button-primary/button-primary.component";
import { ProductDeletionConfirmation } from '../../../features/product/domain/models/product.model';

@Component({
  selector: 'modal-primary',
  imports: [ButtonPrimaryComponent],
  templateUrl: './modal-primary.component.html',
  styleUrl: './modal-primary.component.scss'
})
export class ModalPrimaryComponent {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  @Output() ChangeDeletionConfirmation = new EventEmitter<ProductDeletionConfirmation>();

  title = input.required<string>();
  id = input.required<string>();
  label = input('Login');

  open(): void {
    this.dialogRef.nativeElement?.showModal();
  }

  close(): void {
    this.dialogRef.nativeElement?.close();
  }

  confirm(): void {
    this.ChangeDeletionConfirmation.emit({id: this.id(), message: this.title() });
    this.dialogRef.nativeElement?.close();
  }
}