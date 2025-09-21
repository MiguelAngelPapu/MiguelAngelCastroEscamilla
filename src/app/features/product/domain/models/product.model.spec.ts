import {
  Product,
  CreateProductDto,
  UpdateProductDto,
  DeleteProductDto,
  MessageApi,
} from './product.model';

describe('Product Domain Models', () => {

  describe('Product Interface', () => {
    it('should correctly type-check an object adhering to the Product interface', () => {
      const mockProduct: Product = {
        id: 'prod-001',
        name: 'Tarjeta de Crédito Clásica',
        description: 'Una tarjeta para todas tus compras diarias.',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2025-09-20T00:00:00.000Z',
        date_revision: '2026-09-20T00:00:00.000Z',
      };

      expect(mockProduct).toBeDefined();
      expect(mockProduct.id).toBe('prod-001');
    });

    it('should allow the optional message property', () => {
        const mockProductWithMessage: Product = {
            id: 'prod-002',
            name: 'Tarjeta Oro',
            description: 'Beneficios exclusivos.',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: '2025-10-01T00:00:00.000Z',
            date_revision: '2026-10-01T00:00:00.000Z',
            message: 'Producto creado exitosamente'
          };

          expect(mockProductWithMessage.message).toBe('Producto creado exitosamente');
    });
  });

  describe('CreateProductDto Interface', () => {
    it('should correctly type-check an object for product creation', () => {
      const mockCreateDto: CreateProductDto = {
        id: 'new-prod-003',
        name: 'Tarjeta Estudiante',
        description: 'Ideal para empezar tu vida crediticia.',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2025-11-15T00:00:00.000Z',
        date_revision: '2026-11-15T00:00:00.000Z',
      };
      expect(mockCreateDto.id).toBe('new-prod-003');
    });
  });

  describe('UpdateProductDto Interface', () => {
    it('should correctly type-check an object for product update', () => {
      const mockUpdateDto: UpdateProductDto = {
        name: 'Tarjeta de Crédito Platino',
        description: 'Línea de crédito extendida y beneficios premium.',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: '2027-01-01T00:00:00.000Z',
        date_revision: '2028-01-01T00:00:00.000Z',
        message: 'Actualización exitosa',
      };

      expect((mockUpdateDto as any).id).toBeUndefined();
      expect(mockUpdateDto.name).toBe('Tarjeta de Crédito Platino');
    });
  });

  describe('DeleteProductDto Interface', () => {
    it('should correctly type-check an object for product deletion', () => {
        const mockDeleteDto: DeleteProductDto = {
            id: 'prod-to-delete-004',
            message: 'Producto eliminado'
        };
        expect(mockDeleteDto.id).toBe('prod-to-delete-004');
        expect(mockDeleteDto.message).toBe('Producto eliminado');
    });
  });

  describe('MessageApi Interface', () => {
    it('should correctly type-check an object for a generic API message', () => {
        const mockApiMessage: MessageApi = {
            status: 404,
            message: 'Recurso no encontrado'
        };
        expect(mockApiMessage.status).toBe(404);
        expect(mockApiMessage.message).toBe('Recurso no encontrado');
    });
  });
});
