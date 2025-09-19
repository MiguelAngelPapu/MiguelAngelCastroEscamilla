import { inject, Injectable } from '@angular/core';
import { ProductRepository } from '../domain/repositories/product.repository';
import { Observable } from 'rxjs';
import { Product, ProductDeletionConfirmation } from '../domain/models/product.model';


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
    /**
     * Caso de Uso para eliminar un producto por su ID.
     * Delega la llamada al repositorio.
     * @param id El ID del producto a eliminar.
     * @returns Un Observable<void> que se completa si la eliminación es exitosa.
     */
    deleteProduct(id: string): Observable<ProductDeletionConfirmation> {
        return this.productRepository.deleteById(id);
    }
}
