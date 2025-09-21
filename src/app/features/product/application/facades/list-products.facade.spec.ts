import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListProductsFacade } from './list-products.facade';
import { ProductService } from '../services/product.service';
import { of, Subject } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { DestroyRef } from '@angular/core';

const MOCK_PRODUCTS: Product[] = [
  { id: 'cc-01', name: 'Credit Card', description: 'Standard credit card', logo: 'logo1.png', date_release: '2025-01-01', date_revision: '2026-01-01' },
  { id: 'sv-02', name: 'Savings Account', description: 'Basic savings account', logo: 'logo2.png', date_release: '2025-02-01', date_revision: '2026-02-01' },
  { id: 'ln-03', name: 'Personal Loan', description: 'Loan for personal use', logo: 'logo3.png', date_release: '2025-03-01', date_revision: '2026-03-01' },
];

describe('ListProductsFacade', () => {
  let facade: ListProductsFacade;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {

    const spy = jasmine.createSpyObj('ProductService', ['getAllProducts', 'deleteProduct']);

    TestBed.configureTestingModule({
      providers: [
        ListProductsFacade,
        { provide: ProductService, useValue: spy }
      ]
    });

    facade = TestBed.inject(ListProductsFacade);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should fetch products and update the allProducts signal', () => {
    productServiceSpy.getAllProducts.and.returnValue(of(MOCK_PRODUCTS));
    
    facade.fetchProducts();

    expect(facade.allProducts()).toEqual(MOCK_PRODUCTS);
  });

  it('should delete a product and then refetch the list', () => {
  productServiceSpy.deleteProduct.and.returnValue(of({ id: 'cc-01', message: 'Deleted' }));

    productServiceSpy.getAllProducts.and.returnValue(of([]));


    facade.deleteProductById('cc-01');

    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith('cc-01');
    expect(productServiceSpy.getAllProducts).toHaveBeenCalled();
  });

  it('should change the page limit signal', () => {
    facade.changePageLimit(10);
    expect(facade.limit()).toBe(10);
  });

  describe('Computed Signals', () => {
    beforeEach(() => {

      facade.allProducts.set(MOCK_PRODUCTS);
    });

    it('should return all products when search term is short or empty', () => {
      facade.searchTerm.set('');
      expect(facade.filteredProducts().length).toBe(3);

      facade.searchTerm.set('sa');
      expect(facade.filteredProducts().length).toBe(3);
    });

    it('should filter products based on a valid search term', () => {
      facade.searchTerm.set('Loan');
      expect(facade.filteredProducts().length).toBe(1);
      expect(facade.filteredProducts()[0].id).toBe('ln-03');
    });

    it('should return a paginated list of products based on the limit', () => {
      facade.limit.set(2);
      expect(facade.paginatedProducts().length).toBe(2);
      expect(facade.paginatedProducts()[0].id).toBe('cc-01');
      expect(facade.paginatedProducts()[1].id).toBe('sv-02');
    });
  });

  it('should update search term after debounce time from an observable', fakeAsync(() => {
    const search$ = new Subject<string>();

    const destroyRef = TestBed.inject(DestroyRef); 

    facade.connectSearch(search$.asObservable(), destroyRef);
    search$.next('credit');
    expect(facade.searchTerm()).toBe('');


    tick(300);
    expect(facade.searchTerm()).toBe('credit');
  }));
});
