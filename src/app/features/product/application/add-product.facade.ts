import { inject, Injectable, signal } from '@angular/core';
import { ProductService } from './product.service';
import { MyProduct } from '../domain/models/product.model';

@Injectable({
    providedIn: 'root'
})

export class AddProductFacade {
    private productService = inject(ProductService);
    product = signal<MyProduct | null>(null);
   
    saveProduct(product: MyProduct): void {
        this.productService.addProduct(product).subscribe(products => this.product.set(products));

         
    }
   
}