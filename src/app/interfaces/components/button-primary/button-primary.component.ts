import { Component, input } from '@angular/core';

@Component({
  selector: 'button-primary',
  imports: [],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss'
})
export class ButtonPrimaryComponent {
  label = input.required<string>();
  type = input<'button' | 'submit'>('button');
  variant = input<'confirm' | 'cancel'>('confirm');
  form = input<string>('');
  disabled = input<boolean>(false);
  
}
