import { Observable } from 'rxjs';
import { Product, DeleteProductDto, CreateProductDto, UpdateProductDto } from '../models/product.model';

export abstract class ProductRepository {
    // Clase abstracta que actúa como un contrato para la inyección de dependencias.

    abstract getAll(): Observable<Product[]>;
    abstract deleteById(id: string): Observable<DeleteProductDto>;
    abstract add(product: CreateProductDto): Observable<CreateProductDto>;
    abstract verificationProduct(id: string): Observable<boolean>;
    abstract update(id:string ,product: CreateProductDto): Observable<UpdateProductDto>;
}

