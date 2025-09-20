import { Observable } from 'rxjs';
import { Product, DeleteProductDto, CreateProductDto, UpdateProductDto, MessageApi } from '../models/product.model';

export abstract class ProductRepository {
    // Clase abstracta que actúa como un contrato para la inyección de dependencias.

    abstract getAll(): Observable<Product[]>;
    abstract deleteById(id: string): Observable<DeleteProductDto>;
    abstract add(product: CreateProductDto): Observable<CreateProductDto | MessageApi | undefined>;
    abstract verificationProduct(id: string): Observable<boolean>;
    abstract update(id:string ,product: CreateProductDto): Observable<UpdateProductDto | MessageApi>;
}

