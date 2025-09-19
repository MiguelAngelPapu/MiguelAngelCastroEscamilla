import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'dropdown-primary',
  imports: [],
  templateUrl: './dropdown-primary.component.html',
  styleUrl: './dropdown-primary.component.scss'
})
export class DropdownPrimaryComponent {
  type = input.required<'select' | 'dropdown'>();
  isOpen = signal<boolean>(false);
  public items: number[] = [1, 2, 3, 4];
  public selectedValue: number = 5;

  // Solo abre/cierra el menú.
  public toggleDropdown(): void {
    this.isOpen.set(!this.isOpen());
  }

  // Selecciona un valor y siempre cierra el menú.
  public selectItem(item: number): void {
    this.selectedValue = item;
    this.isOpen.set(false);
  }
}