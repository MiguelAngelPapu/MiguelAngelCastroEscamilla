import { Component, ElementRef, EventEmitter, input, Output, ViewChild } from '@angular/core';
import { ButtonPrimaryComponent } from "../button-primary/button-primary.component";

@Component({
  selector: 'modal-primary',
  imports: [ButtonPrimaryComponent],
  templateUrl: './modal-primary.component.html',
  styleUrl: './modal-primary.component.scss'
})
export class ModalPrimaryComponent {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  @Output() dialoChange = new EventEmitter();

  title = input.required<string>();
  label = input('Login');

  open(): void {
    this.dialogRef.nativeElement?.showModal();
  }

  close(): void {
    this.dialogRef.nativeElement?.close();
  }

  confirm(): void {
    this.dialogRef.nativeElement?.close();
    // Aquí puedes emitir un EventEmitter si lo deseas
    this.dialoChange.emit(true);
  }
}