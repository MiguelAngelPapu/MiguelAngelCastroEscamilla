import { Component, computed, effect, EventEmitter, input, Output, signal } from '@angular/core';
import { Product } from '../../../features/product/domain/models/product.model';
import { calculatePaginationOptions } from '../../core/validators/validators';

@Component({
  selector: 'select-primary',
  imports: [],
  templateUrl: './select-primary.component.html',
  styleUrl: './select-primary.component.scss'
})
export class SelectPrimaryComponent {

  @Output() valueChanged = new EventEmitter<number>();
  data = input.required<Product[]>();
  isOpen = signal<boolean>(false);

  selectedValue = signal<number>(0);
  
  constructor() {
    effect(() => {
      const options = this.limitOptions();
      const current = this.selectedValue();

      // Si aún no hay opciones, no hagas nada.
      if (options.length === 0) return;

      // Revisa si el valor actual es válido. Si no, lo corrige.
      if (!options.includes(current)) {
        // Establece el valor a la nueva opción más alta.
        this.selectedValue.set(options[options.length - 1]);
      }

      // Finalmente, notifica al padre del valor correcto y actual.
      this.valueChanged.emit(this.selectedValue());
    });
  }

  limitOptions = computed(() => calculatePaginationOptions(this.data()));


  toggleMenu(): void {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(limit: number): void {
    this.selectedValue.set(limit); // Solo actualiza el estado.
    this.isOpen.set(false);         // El 'effect' se encargará de notificar al padre.
  }
}