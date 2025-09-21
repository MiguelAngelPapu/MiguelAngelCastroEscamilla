import {
  GetProductsResponse,
  ProductsResponseResult,
  ProductDeleteByIdRespose,
  CreateProductsResponse,
  ProductResponseDto,
  UpdateRespose,
  ProductUpdateResponseDto,
} from './product-api.interface';

describe('Product API Interfaces', () => {

  describe('GetProductsResponse', () => {
    it('should correctly type-check a response for getting all products', () => {
      const mockResponse: GetProductsResponse = {
        data: [
          {
            id: 'api-prod-001',
            name: 'Tarjeta desde API',
            description: 'Descripción que viene de la API.',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2025-09-20T00:00:00.000Z',
            date_revision: '2026-09-20T00:00:00.000Z',
          },
        ],
      };

      expect(mockResponse).toBeDefined();
      expect(mockResponse.data.length).toBe(1);
      expect(mockResponse.data[0].id).toBe('api-prod-001');
    });
  });

  describe('ProductDeleteByIdRespose', () => {
    it('should correctly type-check a response for product deletion', () => {
      const mockResponse: ProductDeleteByIdRespose = {
        message: 'Product deleted successfully',
      };
      expect(mockResponse.message).toBe('Product deleted successfully');
    });
  });

  describe('CreateProductsResponse', () => {
    it('should correctly type-check a response for product creation', () => {
      const mockResponse: CreateProductsResponse = {
        message: 'Product created',
        data: {
          id: 'new-api-prod-002',
          name: 'Nueva Tarjeta API',
          description: 'Nueva descripción API.',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: '2025-10-01T00:00:00.000Z',
          date_revision: '2026-10-01T00:00:00.000Z',
        },
      };
      expect(mockResponse.data.id).toBe('new-api-prod-002');
    });
  });

  describe('UpdateRespose', () => {
    it('should correctly type-check a response for product update', () => {
      const mockResponse: UpdateRespose = {
        message: 'Product updated',
        data: {
          name: 'Tarjeta Actualizada API',
          description: 'Descripción actualizada API.',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: '2027-01-15T00:00:00.000Z',
          date_revision: '2028-01-15T00:00:00.000Z',
        },
      };

      expect((mockResponse.data as any).id).toBeUndefined();
      expect(mockResponse.data.name).toBe('Tarjeta Actualizada API');
    });
  });
});
