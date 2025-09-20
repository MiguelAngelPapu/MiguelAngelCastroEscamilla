import { Component, input } from '@angular/core';

@Component({
  selector: 'toast-primary',
  imports: [],
  templateUrl: './toast-primary.component.html',
  styleUrl: './toast-primary.component.scss'
})
export class ToastPrimaryComponent {
  text = input.required<string>();
  isSuccess = input.required<boolean>();
}
