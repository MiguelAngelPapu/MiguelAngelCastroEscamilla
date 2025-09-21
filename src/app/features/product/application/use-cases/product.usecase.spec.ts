import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductApiService } from './product.usecase';
import { environment } from '../../../../../environments/environment';
import { CreateProductDto, UpdateProductDto } from '../../domain/models/product.model';
import { GetProductsResponse } from '../../infrastructure/interfaces/product-api.interface';


describe('ProductApiService', () => {
  let service: ProductApiService;

  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApiService]
    });

    service = TestBed.inject(ProductApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products and map the response', () => {
    const mockApiResponse: GetProductsResponse = {
      data: [{ id: 'test-01', name: 'Test Card', description: 'Desc', logo: 'logo.png', date_release: '2025-09-20T00:00:00.000Z', date_revision: '2026-09-20T00:00:00.000Z' }]
    };

    service.getAll().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products[0].id).toBe('test-01');
    });

    const req = httpMock.expectOne(`${apiUrl}/bp/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should delete a product by id', () => {
    const testId = 'test-01';
    const mockResponse = { message: 'Product deleted successfully' };

    service.deleteById(testId).subscribe(response => {
      expect(response.message).toBe('Product deleted successfully');
    });

    const req = httpMock.expectOne(`${apiUrl}/bp/products/${testId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should add a new product', () => {
    const newProduct: CreateProductDto = {
      id: 'new-01',
      name: 'New Product',
      description: 'New Description',
      logo: 'new-logo.png',
      date_release: '2025-09-20T00:00:00.000Z',
      date_revision: '2026-09-20T00:00:00.000Z',
      message: undefined
    } as any;

    const mockResponse = { data: newProduct };

    service.add(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/bp/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(mockResponse);
  });

  it('should verify a product id and return true if it exists', () => {
    const testId = 'existing-id';
    
    service.verificationProduct(testId).subscribe(exists => {
      expect(exists).toBeTrue();
    });

    const req = httpMock.expectOne(`${apiUrl}/bp/products/verification/${testId}`);
    expect(req.request.method).toBe('GET');
    req.flush(true);
  });

  it('should update a product', () => {
    const testId = 'test-01';
  const productUpdate: CreateProductDto = {
    name: 'Updated Product',
    description: 'Updated Description',
    logo: 'updated-logo.png',
    date_release: '2025-09-21T00:00:00.000Z',
    date_revision: '2026-09-21T00:00:00.000Z'
  } as any;


  const mockResponse = { message: 'Updated', data: { name: productUpdate.name, description: productUpdate.description, logo: productUpdate.logo, date_release: productUpdate.date_release, date_revision: productUpdate.date_revision } };

  service.update(testId, productUpdate).subscribe((product) => {
    const updated = product as UpdateProductDto;
    expect(updated.name).toBe('Updated Product');
  });

    const req = httpMock.expectOne(`${apiUrl}/bp/products/${testId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(productUpdate);
    req.flush(mockResponse);
  });
});
