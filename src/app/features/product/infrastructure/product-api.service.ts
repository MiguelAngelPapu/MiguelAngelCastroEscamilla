import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductRepository } from '../domain/repositories/product.repository';

import { CreateProductDto, DeleteProductDto, Product, UpdateProductDto} from '../domain/models/product.model';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { GetProductsResponse, ProductDeleteByIdRespose, CreateProductsResponse } from './interfaces/product-api.interface';
import { toProducts, toDeleteMessage, toProductAdd, toUpdateProduct } from './mappers/product.mapper';


@Injectable() // No necesita providedIn: 'root' porque lo proveeremos manualmente
export class ProductApiService extends ProductRepository {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    override getAll(): Observable<Product[]> {
        return this.http.get<GetProductsResponse>(`${this.apiUrl}/bp/products`)
            .pipe(
                // Pasa la respuesta completa al mapper, que sabrá cómo manejarla
                map(response => toProducts(response))
            );
    }

    override deleteById(id: string): Observable<DeleteProductDto> {
        return this.http.delete<ProductDeleteByIdRespose>(`${this.apiUrl}/bp/products/${id}`)
            .pipe(
                map(response => toDeleteMessage(id, response))
            );
    }


    override add(product: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.post<CreateProductsResponse>(`${this.apiUrl}/bp/products`, product, { headers })
            .pipe(
                map(response => toProductAdd(response))
            );
    }

    override verificationProduct(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/bp/products/verification/${id}`);
    }

    override update(id: string, product: CreateProductDto): Observable<UpdateProductDto> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<CreateProductsResponse>(`${this.apiUrl}/bp/products/${id}`, product, { headers })
            .pipe(
                map(response => toUpdateProduct(response))
            );
    }
}