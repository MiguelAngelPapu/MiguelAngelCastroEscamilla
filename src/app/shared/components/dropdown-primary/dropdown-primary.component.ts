import { Component, EventEmitter, input, InputSignal, Output, signal, ViewChild } from '@angular/core';
import { Product, ProductDeletionConfirmation } from '../../../features/product/domain/models/product.model';
import { ModalPrimaryComponent } from "../modal-primary/modal-primary.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dropdown-primary',
  imports: [RouterModule, ModalPrimaryComponent],
  templateUrl: './dropdown-primary.component.html',
  styleUrl: './dropdown-primary.component.scss'
})
export class DropdownPrimaryComponent {
  @ViewChild('dialog') dialogComponent!: ModalPrimaryComponent;
  @Output() ChangeDeletionConfirmation = new EventEmitter<ProductDeletionConfirmation>()

  id = input.required<string>();
  name = input<string>();
  title = signal<string>('')
  isOpen = signal<boolean>(false);
  
  toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
  }

  showModalEliminar(): void {
    this.title.set(`¿Esta seguro de eliminar el producto ${this.name()} ?`)
    this.dialogComponent.open();
  }

}