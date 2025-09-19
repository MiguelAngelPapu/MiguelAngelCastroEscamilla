import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TablePrimaryComponent } from '../../../../shared/components/table-primary/table-primary.component';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from '../../../../shared/components/button-primary/button-primary.component';
import { DropdownPrimaryComponent } from '../../../../shared/components/dropdown-primary/dropdown-primary.component';
import { getFormErrorMessage } from '../../../../shared/core/validators/validators';
import { ProductService } from '../../application/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-list-products',
  imports: [RouterModule, AsyncPipe, TablePrimaryComponent, InputPrimaryComponent, ButtonPrimaryComponent, DropdownPrimaryComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {
  private productService = inject(ProductService);
  public products$!: Observable<Product[]>;
  private formBuilder = inject(FormBuilder);
  // Formulario reactivo
  form = this.formBuilder.group({
    search: ['', [Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }
}
