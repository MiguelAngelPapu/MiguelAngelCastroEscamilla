import { Component, inject } from '@angular/core';
import { TablePrimaryComponent } from "../../components/table-primary/table-primary.component";
import { InputPrimaryComponent } from "../../components/input-primary/input-primary.component";
import { ButtonPrimaryComponent } from "../../components/button-primary/button-primary.component";
import { DropdownPrimaryComponent } from "../../components/dropdown-primary/dropdown-primary.component";
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { getFormErrorMessage } from '../../../core/validators/validators';

@Component({
  selector: 'app-list-products',
  imports: [RouterModule, TablePrimaryComponent, InputPrimaryComponent, ButtonPrimaryComponent, DropdownPrimaryComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {

  private formBuilder = inject(FormBuilder);
  // Formulario reactivo
  form = this.formBuilder.group({
    search: ['', [Validators.minLength(3)]],
  });


  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }
}
