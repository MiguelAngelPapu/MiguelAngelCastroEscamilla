import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { Product } from '../../../features/product/domain/models/product.model';

@Component({
  selector: 'select-primary',
  imports: [],
  templateUrl: './select-primary.component.html',
  styleUrl: './select-primary.component.scss'
})
export class SelectPrimaryComponent {
  data = input.required<Product[]>();
  @Output() valueChanged = new EventEmitter<number>();
  isOpen = signal<boolean>(false);
  selectedValue = signal<number>(5);
  limitOptions = computed(() => {
    const length = this.data()?.length ?? 0;
    const count = Math.max(1, Math.ceil(length / 5));
    return Array.from({ length: count }, (_, i) => (i + 1) * 5);
  });

  toggleMenu(): void {
    this.isOpen.set(!this.isOpen());
  }

  
  selectOption(limit: number): void {
    this.selectedValue.set(limit);
    this.valueChanged.emit(limit);
    this.isOpen.set(false);
  }
}