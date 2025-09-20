import { Observable } from 'rxjs';
import { Product, ProductDeletionConfirmation, MyProduct, ProductUpdate } from '../models/product.model';

export abstract class ProductRepository {
    // Clase abstracta que actúa como un contrato para la inyección de dependencias.

    abstract getAll(): Observable<Product[]>;
    abstract deleteById(id: string): Observable<ProductDeletionConfirmation>;
    abstract add(product: MyProduct): Observable<MyProduct>;
    abstract verificationProduct(id: string): Observable<boolean>;
    abstract update(id:string ,product: MyProduct): Observable<ProductUpdate>;
}

