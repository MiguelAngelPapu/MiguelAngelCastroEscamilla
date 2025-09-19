import { Component, EventEmitter, input, Output } from '@angular/core';
import { DropdownPrimaryComponent } from "../dropdown-primary/dropdown-primary.component";
import { Product, ProductDeletionConfirmation } from '../../../features/product/domain/models/product.model';
import { DatePipe } from '@angular/common';
import { ModalPrimaryComponent } from "../modal-primary/modal-primary.component";

@Component({
  selector: 'table-primary',
  imports: [DatePipe, DropdownPrimaryComponent],
  templateUrl: './table-primary.component.html',
  styleUrl: './table-primary.component.scss'
})
export class TablePrimaryComponent {
  @Output() ChangeDeletionConfirmation = new EventEmitter<ProductDeletionConfirmation>()
  data = input.required<Product[]>();
}
