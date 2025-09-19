import { Observable } from 'rxjs';
import { Product, ProductDeletionConfirmation } from '../models/product.model';

export abstract class ProductRepository {
    // Clase abstracta que actúa como un contrato para la inyección de dependencias.

    abstract getAll(): Observable<Product[]>;
    abstract add(product: Product): Observable<void>;
    abstract deleteById(id: string): Observable<ProductDeletionConfirmation>;
}

