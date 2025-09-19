import { Component, computed, effect, EventEmitter, input, Output, signal } from '@angular/core';
import { Product } from '../../../features/product/domain/models/product.model';

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



  limitOptions = computed(() => {
    const length = this.data().length ?? 0;
    const options = [];
    let currentOptionValue = 0;
    let i = 0;

    // Mientras el valor de la opción sea menor que el total de items,
    // sigue agregando opciones a la lista.
    while (currentOptionValue < length) {
      if (i === 0) {
        // La primera opción es siempre 5.
        currentOptionValue = 5;
      } else {
        // Las siguientes son 10, 20, 30...
        currentOptionValue = i * 10;
      }
      options.push(currentOptionValue);
      i++;
    }

    // Si no hay datos, asegúrate de que al menos la opción '5' exista.
    if (options.length === 0) {
      return [5];
    }

    return options;
  });

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

  toggleMenu(): void {
    this.isOpen.set(!this.isOpen());
  }

  selectOption(limit: number): void {
    this.selectedValue.set(limit); // Solo actualiza el estado.
    this.isOpen.set(false);         // El 'effect' se encargará de notificar al padre.
  }
}