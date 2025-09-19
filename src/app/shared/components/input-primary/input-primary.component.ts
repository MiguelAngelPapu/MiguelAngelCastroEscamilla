import { Component, effect, EventEmitter, input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'input-primary',
  imports: [ReactiveFormsModule],
  templateUrl: './input-primary.component.html',
  styleUrl: './input-primary.component.scss'
})
export class InputPrimaryComponent {
  control = input.required<FormControl>();
  label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  errorMessage = input<string>('');
}