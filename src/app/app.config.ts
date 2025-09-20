import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ProductRepository } from './features/product/domain/repositories/product.repository';
import { ProductApiService } from './features/product/application/use-cases/product.usecase';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withFetch()), // Necesario para que HttpClient funcione

    // --- AQUÍ OCURRE LA MAGIA ---
    // Le decimos a Angular que la implementación para el contrato ProductRepository
    // es la clase ProductApiService.
    { provide: ProductRepository, useClass: ProductApiService }
  ]
};
