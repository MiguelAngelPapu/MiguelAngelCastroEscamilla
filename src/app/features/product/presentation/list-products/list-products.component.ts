import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TablePrimaryComponent } from '../../../../shared/components/table-primary/table-primary.component';
import { InputPrimaryComponent } from '../../../../shared/components/input-primary/input-primary.component';
import { ButtonPrimaryComponent } from '../../../../shared/components/button-primary/button-primary.component';
import { getFormErrorMessage } from '../../../../shared/core/validators/validators';
import { ProductService } from '../../application/product.service';
import { Product, ProductDeletionConfirmation } from '../../domain/models/product.model';
import { SelectPrimaryComponent } from "../../../../shared/components/select-primary/select-primary.component";


@Component({
  selector: 'app-list-products',
  imports: [RouterModule, TablePrimaryComponent, InputPrimaryComponent, ButtonPrimaryComponent, SelectPrimaryComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private formBuilder = inject(FormBuilder);
  
  // Usamos signals para manejar todo el estado de forma simple.
  allProducts = signal<Product[]>([]);
  limit = signal<number>(5);
  
  // La paginación es una signal computada. Se actualiza sola si cambia
  // 'allProducts' o 'limit'. ¡Simple y efectivo!
  paginatedProducts = computed(() => {
    const products = this.allProducts();
    const currentLimit = this.limit();
    // Simplemente muestra la cantidad de productos indicada por 'limit', desde el principio.
    return products.slice(0, currentLimit);
  });
  
  form = this.formBuilder.group({
    search: ['', [Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.fetchProducts(); // Carga inicial de datos.
  }
  /**
   *Centralizamos la obtención de datos en un solo método.
   * Este método es ahora nuestra única fuente para actualizar la lista.
  */
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(products => {
      this.allProducts.set(products);
    });
  }
  getFormErrorMessage(control: FormControl): string {
    return getFormErrorMessage(control);
  }

  // Simplemente actualizamos la signal del límite.
  changePageLimit(newLimit: number): void {
    this.limit.set(newLimit);
  }
 
  deleteProductById({ id }: ProductDeletionConfirmation): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log(`Producto ${id} eliminado.`);
        this.fetchProducts(); // ¡Simple! Solo volvemos a pedir los datos.
      },
      error: (err) => console.error('Error al eliminar:', err)
    });
  }
}