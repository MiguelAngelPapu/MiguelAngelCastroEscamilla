import { Component, input, InputSignal, signal, ViewChild } from '@angular/core';
import { Product } from '../../../features/product/domain/models/product.model';
import { ModalPrimaryComponent } from "../modal-primary/modal-primary.component";

@Component({
  selector: 'dropdown-primary',
  imports: [ModalPrimaryComponent],
  templateUrl: './dropdown-primary.component.html',
  styleUrl: './dropdown-primary.component.scss'
})
export class DropdownPrimaryComponent {
  @ViewChild('dialog') dialogComponent!: ModalPrimaryComponent;

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
  showModalEditar(): void {
    throw new Error('Method not implemented.');
  }

}