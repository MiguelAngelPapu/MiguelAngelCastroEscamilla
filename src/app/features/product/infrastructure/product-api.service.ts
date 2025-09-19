import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductRepository } from '../domain/repositories/product.repository';

import { Product } from '../domain/models/product.model';
import { environment } from '../../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ProductApiResponse } from './interfaces/product-api.interface';
import { toProducts } from './mappers/product.mapper';


@Injectable() // No necesita providedIn: 'root' porque lo proveeremos manualmente
export class ProductApiService extends ProductRepository {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    override getAll(): Observable<Product[]> {
        return this.http.get<ProductApiResponse>(`${this.apiUrl}/bp/products`)
        .pipe(
            // 2. Pasa la respuesta completa al mapper, que sabrá cómo manejarla
            map(response => toProducts(response))
        );
    }


    override add(product: Product): Observable<void> {
        throw new Error('Method not implemented.');
    }


}