import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductRepository } from '../domain/repositories/product.repository';

import { CreateProductDto, DeleteProductDto, MessageApi, Product, UpdateProductDto } from '../domain/models/product.model';
import { environment } from '../../../../environments/environment';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { GetProductsResponse, ProductDeleteByIdRespose, CreateProductsResponse } from './interfaces/product-api.interface';
import { toProducts, toDeleteMessage, toProductAdd, toUpdateProduct } from './mappers/product.mapper';


@Injectable() // No necesita providedIn: 'root' porque lo proveeremos manualmente
export class ProductApiService extends ProductRepository {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    override getAll(): Observable<Product[]> {
        return this.http.get<GetProductsResponse>(`${this.apiUrl}/bp/products`)
            .pipe(
                delay(200),
                // Pasa la respuesta completa al mapper, que sabrá cómo manejarla
                map(response => toProducts(response)),

            );
    }

    override deleteById(id: string): Observable<DeleteProductDto> {
        return this.http.delete<ProductDeleteByIdRespose>(`${this.apiUrl}/bp/products/${id}`)
            .pipe(
                map(response => toDeleteMessage(id, response))
            );
    }


    override add(product: any): Observable<CreateProductDto | MessageApi> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<CreateProductsResponse>(`${this.apiUrl}/bp/products`, product, { headers })
            .pipe(
                map(response => toProductAdd(response)),
                catchError(error => {
                    const response: MessageApi = {
                        status: error.status,
                        message: error.error?.message || error.statusText
                    };

                    return of(response);
                })
            );
    }

    override verificationProduct(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/bp/products/verification/${id}`).pipe(
            catchError(error => {
                return of(false);
            })
        );
    }

    override update(id: string, product: CreateProductDto): Observable<UpdateProductDto | MessageApi> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.http.put<CreateProductsResponse>(`${this.apiUrl}/bp/products/${id}`, product, { headers })
            .pipe(
                map(response => toUpdateProduct(response)),
                catchError(error => {
                    const response: MessageApi = {
                        status: error.status,
                        message: error.error?.message || error.statusText
                    };

                    return of(response);
                })
            );
    }
}