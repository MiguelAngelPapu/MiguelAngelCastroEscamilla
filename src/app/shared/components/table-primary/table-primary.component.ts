import { Component, EventEmitter, input, Output } from '@angular/core';
import { DropdownPrimaryComponent } from "../dropdown-primary/dropdown-primary.component";
import { Product, DeleteProductDto } from '../../../features/product/domain/models/product.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'table-primary',
  imports: [DatePipe, DropdownPrimaryComponent],
  templateUrl: './table-primary.component.html',
  styleUrl: './table-primary.component.scss'
})
export class TablePrimaryComponent {
  @Output() ChangeDeletionConfirmation = new EventEmitter<DeleteProductDto>()
  data = input.required<Product[]>();
}
