import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { Product } from '../domain/models/product.model';
import { ProductService } from './product.service';
import { debounceTime, distinctUntilChanged, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Injectable({
    providedIn: 'root'
})

export class ListProductsFacade {
    private productService = inject(ProductService);

    // --- Estado Interno Simplificado ---
    allProducts = signal<Product[]>([]);
    limit = signal<number>(5);
    private searchTerm = signal<string>(''); // El término de búsqueda ahora es un estado interno

    // --- Signals Computadas para la Vista ---
    filteredProducts = computed(() => {
        const all = this.allProducts();
        const query = this.searchTerm();
        if (!query || query.length < 3) {
            return all; // Si no hay búsqueda o es corta, devuelve todos
        }
        return this.searchInAllKeys(query, all);
    });
    
    // La única signal que el componente necesita para la tabla
    paginatedProducts = computed(() => {
        const products = this.filteredProducts();
        return products.slice(0, this.limit());
    });

    // --- Métodos de la API Pública del Facade ---

    fetchProducts(): void {
        this.productService.getAllProducts().subscribe(products => this.allProducts.set(products));
    }

    deleteProductById(id: string): void {
        this.productService.deleteProduct(id).subscribe(() => this.fetchProducts());
    }

    changePageLimit(newLimit: number): void {
        this.limit.set(newLimit);
    }
    
    
    connectSearch(search$: Observable<string | null>, destroyRef: DestroyRef): void {
        search$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            tap(query => this.searchTerm.set(query || '')), // Actualiza la signal de búsqueda
            takeUntilDestroyed(destroyRef) // Usa el destroyRef del componente
        ).subscribe();
    }

    private searchInAllKeys(query: string, data: Product[]): Product[] {
        const lowerCaseQuery = query.toLowerCase();
        return data.filter(item => {
            return Object.values(item)
                .some(value => String(value).toLowerCase().includes(lowerCaseQuery));
        });
    }
}