import { inject, Injectable } from '@angular/core';
import { ProductRepository } from '../domain/repositories/product.repository';
import { Observable } from 'rxjs';
import { Product } from '../domain/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
    // Inyectamos la ABSTRACCIÓN, no la implementación.
    private productRepository = inject(ProductRepository);

    // Este es el "Caso de Uso" para obtener todos los productos.
    // Simplemente delega la llamada al repositorio.
    getAllProducts(): Observable<Product[]> {
        return this.productRepository.getAll();
    }
}
