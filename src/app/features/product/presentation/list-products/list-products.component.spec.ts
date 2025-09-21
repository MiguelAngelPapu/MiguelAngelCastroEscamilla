import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProductsComponent } from './list-products.component';
import { ListProductsFacade } from '../../application/facades/list-products.facade';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';



@Component({ selector: 'app-table-primary', standalone: true, template: '' })
class MockTablePrimaryComponent { }

@Component({ selector: 'app-input-primary', standalone: true, template: '' })
class MockInputPrimaryComponent { }

@Component({ selector: 'app-button-primary', standalone: true, template: '' })
class MockButtonPrimaryComponent { }

@Component({ selector: 'app-select-primary', standalone: true, template: '' })
class MockSelectPrimaryComponent { }


describe('ListProductsComponent', () => {
  let component: ListProductsComponent;
  let fixture: ComponentFixture<ListProductsComponent>;

  const mockFacade = {
    fetchProducts: jasmine.createSpy('fetchProducts'),
    connectSearch: jasmine.createSpy('connectSearch'),
    searchTerm: { set: jasmine.createSpy('set') },
    deleteProductById: jasmine.createSpy('deleteProductById'),
    changePageLimit: jasmine.createSpy('changePageLimit'),
    paginatedProducts: jasmine.createSpy('paginatedProducts').and.returnValue([]),

    filteredProducts: jasmine.createSpy('filteredProducts').and.returnValue([]),
    loading: jasmine.createSpy('loading').and.returnValue(false),
    totalProducts: jasmine.createSpy('totalProducts').and.returnValue(0),
    limit: jasmine.createSpy('limit').and.returnValue(5)
  };

  beforeEach(async () => {

    mockFacade.fetchProducts.calls.reset();
    mockFacade.connectSearch.calls.reset();
    mockFacade.searchTerm.set.calls.reset();
    mockFacade.paginatedProducts.calls.reset();
    mockFacade.filteredProducts.calls.reset();
    mockFacade.loading.calls.reset();
    mockFacade.totalProducts.calls.reset();
    mockFacade.limit.calls.reset();


    await TestBed.configureTestingModule({
      imports: [
        ListProductsComponent,
        MockTablePrimaryComponent,
        MockInputPrimaryComponent,
        MockButtonPrimaryComponent,
        MockSelectPrimaryComponent,
      ],
      providers: [
        { provide: ListProductsFacade, useValue: mockFacade },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchProducts on construction', () => {
    expect(mockFacade.fetchProducts).toHaveBeenCalled();
  });

  it('should call connectSearch on ngOnInit', () => {
    fixture.detectChanges();
    expect(mockFacade.connectSearch).toHaveBeenCalled();
  });
  it('should handle non-empty paginatedProducts', () => {
    mockFacade.paginatedProducts.and.returnValue([{ id: '1', name: 'X' }]);
    fixture.detectChanges();
    expect(mockFacade.paginatedProducts).toHaveBeenCalled();
    expect(mockFacade.filteredProducts).toHaveBeenCalled();
  });
  
  
});

