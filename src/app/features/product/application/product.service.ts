import { inject, Injectable } from '@angular/core';
import { ProductRepository } from '../domain/repositories/product.repository';
import { Observable } from 'rxjs';
import { CreateProductDto, DeleteProductDto, Product, UpdateProductDto } from '../domain/models/product.model';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
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
    deleteProduct(id: string): Observable<DeleteProductDto> {
        return this.productRepository.deleteById(id);
    }

    /**
     * Caso de Uso para agregar un nuevo producto.
     * Delega la creación al repositorio.
     * @param product El producto a agregar
     * @returns Un Observable<Product> con el producto recién creado
     */
    addProduct(product: CreateProductDto): Observable<CreateProductDto> {
        return this.productRepository.add(product);
    }

    /**
     * Caso de Uso para verificar un producto por su ID.
     * Devuelve true o false según la verificación.
     */
    verificationProduct(id: string): Observable<boolean> {
        return this.productRepository.verificationProduct(id);
    }
    /**
     * Caso de Uso para actualizar un producto existente.
     * Delega la actualización al repositorio.
     * @param id El ID del producto a actualizar
     * @param product Los nuevos datos del producto
     * @returns Un Observable<CreateProductDto> con el producto actualizado
     */
    updateProduct(id: string, product: CreateProductDto): Observable<UpdateProductDto> {
        return this.productRepository.update(id, product);
    }
    
}
