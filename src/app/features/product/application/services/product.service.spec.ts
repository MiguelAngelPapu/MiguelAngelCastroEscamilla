import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { of } from 'rxjs';
import { CreateProductDto, Product } from '../../domain/models/product.model';


const MOCK_PRODUCTS: Product[] = [
  { id: 'cc-01', name: 'Credit Card', description: 'Standard credit card', logo: 'logo1.png', date_release: '2025-01-01', date_revision: '2026-01-01' },
  { id: 'sv-02', name: 'Savings Account', description: 'Basic savings account', logo: 'logo2.png', date_release: '2025-02-01', date_revision: '2026-02-01' },
];

describe('ProductService', () => {
  let service: ProductService;

  let repositorySpy: jasmine.SpyObj<ProductRepository>;

  beforeEach(() => {

    const spy = jasmine.createSpyObj('ProductRepository', ['getAll', 'deleteById', 'add', 'verificationProduct', 'update']);

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useValue: spy }
      ]
    });

    service = TestBed.inject(ProductService);
    repositorySpy = TestBed.inject(ProductRepository) as jasmine.SpyObj<ProductRepository>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAll on the repository when getAllProducts is called', () => {
    repositorySpy.getAll.and.returnValue(of(MOCK_PRODUCTS));

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(MOCK_PRODUCTS);
    });

    expect(repositorySpy.getAll).toHaveBeenCalled();
  });

  it('should call deleteById on the repository with the correct id', () => {
    const testId = 'cc-01';
    repositorySpy.deleteById.and.returnValue(of({ id: testId, message: 'Deleted' }));

    service.deleteProduct(testId).subscribe();

    expect(repositorySpy.deleteById).toHaveBeenCalledWith(testId);
  });

  it('should call add on the repository with the correct product data', () => {
    const newProduct: CreateProductDto = { id: 'new-01', name: 'New Product' } as any;
    repositorySpy.add.and.returnValue(of(newProduct));

    service.addProduct(newProduct).subscribe();

    expect(repositorySpy.add).toHaveBeenCalledWith(newProduct);
  });

  it('should call verificationProduct on the repository and return its boolean response', () => {
    const testId = 'sv-02';
    repositorySpy.verificationProduct.and.returnValue(of(true));

    service.verificationProduct(testId).subscribe(result => {
      expect(result).toBeTrue();
    });

    expect(repositorySpy.verificationProduct).toHaveBeenCalledWith(testId);
  });

  it('should call update on the repository with the correct id and payload', () => {
    const testId = 'cc-01';
    const productUpdate: CreateProductDto = { name: 'Updated Credit Card' } as any;
    repositorySpy.update.and.returnValue(of(productUpdate));

    service.updateProduct(testId, productUpdate).subscribe();

    expect(repositorySpy.update).toHaveBeenCalledWith(testId, productUpdate);
  });
});

