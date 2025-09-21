import { 
  toProducts, 
  toDeleteMessage, 
  toProductAdd, 
  toUpdateProduct 
} from './product.mapper';
import { 
  CreateProductsResponse, 
  GetProductsResponse, 
  ProductDeleteByIdRespose, 
  UpdateRespose 
} from '../interfaces/product-api.interface';


describe('Product Mappers', () => {

  describe('toProducts', () => {
    it('should correctly map an API response to an array of Products', () => {
      const mockApiResponse: GetProductsResponse = {
        data: [
          {
            id: 'test-01',
            name: 'Test Card',
            description: 'A card for testing purposes',
            logo: 'logo.png',
            date_release: '2025-09-20T00:00:00.000Z',
            date_revision: '2026-09-20T00:00:00.000Z',
          },
          {
            id: 'test-02',
            name: 'Another Card',
            description: 'Another description',
            logo: 'logo2.png',
            date_release: '2027-10-21T00:00:00.000Z',
            date_revision: '2028-10-21T00:00:00.000Z',
          },
        ],
      };

      const result = toProducts(mockApiResponse);

      expect(result.length).toBe(2);
      expect(result[0].id).toBe('test-01');
      expect(result[0].name).toBe('Test Card');
      expect(result[0].date_release).toBe(new Date('2025-09-20T00:00:00.000Z').toDateString());
      expect(result[0].date_revision).toBe(new Date('2026-09-20T00:00:00.000Z').toDateString());
    });

    it('should return an empty array if the API response has no data', () => {
      const mockApiResponse: GetProductsResponse = {
        data: [],
      };

      const result = toProducts(mockApiResponse);

      expect(result).toEqual([]);
    });
  });

  describe('toDeleteMessage', () => {
    it('should create a DeleteProductDto from an id and a response message', () => {
      const mockId = 'prod-123';
      const mockResponse: ProductDeleteByIdRespose = {
        message: 'Product successfully deleted',
      };

      const result = toDeleteMessage(mockId, mockResponse);

      expect(result.id).toBe(mockId);
      expect(result.message).toBe('Product successfully deleted');
    });
  });

  describe('toProductAdd', () => {
    it('should map a creation response to a CreateProductDto', () => {
      const mockApiResponse: CreateProductsResponse = {
        message: 'Product added successfully',
        data: {
          id: 'new-01',
          name: 'New Product',
          description: 'New Description',
          logo: 'new-logo.png',
          date_release: '2025-01-01T00:00:00.000Z',
          date_revision: '2026-01-01T00:00:00.000Z',
        },
      };

      const result = toProductAdd(mockApiResponse);

      expect(result.id).toBe('new-01');
      expect(result.name).toBe('New Product');
      expect(result.date_release).toBe('2025-01-01T00:00:00.000Z');
      expect(result.message).toBe('Product added successfully');
    });
  });

  describe('toUpdateProduct', () => {
    it('should map an update response to an UpdateProductDto', () => {

      const mockApiResponse: UpdateRespose = {
        message: 'Product updated successfully',
        data: {
          name: 'Updated Product',
          description: 'Updated Description',
          logo: 'updated-logo.png',
          date_release: '2027-02-02T00:00:00.000Z',
          date_revision: '2028-02-02T00:00:00.000Z',
        },
      };


      const result = toUpdateProduct(mockApiResponse);
      
      expect(result.name).toBe('Updated Product');
      expect(result.description).toBe('Updated Description');
      expect(result.date_release).toBe('2027-02-02T00:00:00.000Z');
      expect(result.message).toBe('Product updated successfully');
      expect((result as any).id).toBeUndefined();
    });
  });
});
