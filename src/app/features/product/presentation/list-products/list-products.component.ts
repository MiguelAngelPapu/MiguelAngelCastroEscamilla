import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TablePrimaryComponent } from '../../../../shared/components/table-primary/table-primary.component';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from '../../../../shared/components/button-primary/button-primary.component';
import { getFormErrorMessage } from '../../../../shared/core/validators/validators';
import { ProductService } from '../../application/product.service';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { AsyncPipe } from '@angular/common';
import { SelectPrimaryComponent } from "../../../../shared/components/select-primary/select-primary.component";


@Component({
  selector: 'app-list-products',
  imports: [RouterModule, AsyncPipe, TablePrimaryComponent, InputPrimaryComponent, ButtonPrimaryComponent, SelectPrimaryComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private formBuilder = inject(FormBuilder);
  products$!: Observable<Product[]>;
  products = signal<Product[]>([]);
  
  form = this.formBuilder.group({
    search: ['', [Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    this.paginatedData(5);

  }

  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }

  paginatedData(limit: number): void {
    // El tamaño de cada "página" es fijo
    const pageSize = 5;
    // Calculamos los índices para el slice
    const endIndex = limit;
    const startIndex = endIndex - pageSize;
    this.products$.subscribe(response => {
      // Cortamos el array usando el inicio y el fin
      const pageOfProducts = response.slice(startIndex, endIndex);
      this.products.set(pageOfProducts);
    });
  }
}
