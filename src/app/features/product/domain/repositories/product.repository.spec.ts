import { of } from 'rxjs';
import { CreateProductDto, Product } from '../models/product.model';
import { ProductRepository } from './product.repository';


class MockProductRepository extends ProductRepository {
  getAll = jasmine.createSpy('getAll').and.returnValue(of([]));
  deleteById = jasmine.createSpy('deleteById').and.returnValue(of({ id: '', message: '' }));
  add = jasmine.createSpy('add').and.returnValue(of(undefined));
  verificationProduct = jasmine.createSpy('verificationProduct').and.returnValue(of(false));
  update = jasmine.createSpy('update').and.returnValue(of({} as any));
}

describe('ProductRepository (Mock)', () => {
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();
  });

  it('should be created', () => {
    expect(mockRepository).toBeTruthy();
  });

  it('should have a spy for the getAll method', () => {
    const mockProducts: Product[] = [{ id: '1', name: 'Test' } as Product];
    mockRepository.getAll.and.returnValue(of(mockProducts));

    mockRepository.getAll().subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });

    expect(mockRepository.getAll).toHaveBeenCalled();
  });

  it('should have a spy for the add method', () => {
    const newProduct: CreateProductDto = { id: '2', name: 'New' } as CreateProductDto;
    mockRepository.add.and.returnValue(of(newProduct));

    mockRepository.add(newProduct).subscribe((product: CreateProductDto) => {
      expect(product).toEqual(newProduct);
    });

    expect(mockRepository.add).toHaveBeenCalledWith(newProduct);
  });

  it('should have a spy for the verificationProduct method', () => {
    const productId = 'abc';
    mockRepository.verificationProduct.and.returnValue(of(true));

    mockRepository.verificationProduct(productId).subscribe((exists: boolean) => {
      expect(exists).toBe(true);
    });

    expect(mockRepository.verificationProduct).toHaveBeenCalledWith(productId);
  });
});
