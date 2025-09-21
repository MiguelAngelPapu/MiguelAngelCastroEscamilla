import { TestBed } from '@angular/core/testing';
import { UpdateProductFacade } from './update-product.facade';
import { ProductService } from '../services/product.service';
import { of, throwError } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ReactiveFormsModule } from '@angular/forms';

const MOCK_PRODUCTS: Product[] = [
  { id: 'cc-01', name: 'Credit Card', description: 'Standard credit card', logo: 'logo1.png', date_release: '2025-01-01T00:00:00.000Z', date_revision: '2026-01-01T00:00:00.000Z' },
];

describe('UpdateProductFacade', () => {
  let facade: UpdateProductFacade;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['updateProduct', 'verificationProduct', 'getAllProducts']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        UpdateProductFacade,
        { provide: ProductService, useValue: spy }
      ]
    });

    facade = TestBed.inject(UpdateProductFacade);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('Mode Switching', () => {
    it('should enable edit mode and update form controls state', () => {
      facade.enableEditMode();

      expect(facade.isEditMode()).toBeTrue();
      expect(facade.form.get('id')?.disabled).toBeTrue();
      expect(facade.form.get('name')?.enabled).toBeTrue();
    });

    it('should cancel edit mode and revert form controls state', () => {
      facade.enableEditMode();
      facade.cancelEditMode();

      expect(facade.isEditMode()).toBeFalse();
      expect(facade.form.get('id')?.enabled).toBeTrue();
      expect(facade.form.get('name')?.disabled).toBeTrue();
    });
  });

  describe('Data Handling', () => {
    it('should fetch product and patch form if product exists', async () => {
      productServiceSpy.verificationProduct.and.returnValue(of(true));
      productServiceSpy.getAllProducts.and.returnValue(of(MOCK_PRODUCTS));

      await facade.getProductById('cc-01');

      expect(facade.form.get('name')?.value).toBe('Credit Card');
    });


    it('should call reset if product does not exist', async () => {
      productServiceSpy.verificationProduct.and.returnValue(of(false));
      spyOn(facade, 'reset').and.callThrough();

      await facade.getProductById('non-existent-id');

      expect(facade.reset).toHaveBeenCalled();
      expect(productServiceSpy.getAllProducts).not.toHaveBeenCalled();
    });

    it('should call updateProduct on valid form submission', async () => {
      facade.enableEditMode();
      const validData = {
        name: 'Updated Card', description: 'Updated Desc', logo: 'new.png',
        date_release: '2028-01-01', date_revision: '2029-01-01', id: 'cc-01'
      };
      facade.form.setValue(validData);
      expect(facade.form.valid).toBeTrue();

      const successResponse = { status: 200, message: 'Updated' };
      productServiceSpy.updateProduct.and.returnValue(of(successResponse));

      const result = await facade.update();

      expect(productServiceSpy.updateProduct).toHaveBeenCalled();
      expect(result).toEqual(successResponse);
    });

    it('should not patch the form if verification is true but product not found', async () => {
      productServiceSpy.verificationProduct.and.returnValue(of(true));
      productServiceSpy.getAllProducts.and.returnValue(of([]));

      await facade.getProductById('missing-id');

      expect(facade.form.get('name')?.value).toBe('');
    });

    it('should propagate error when updateProduct throws', async () => {

      facade.enableEditMode();
      const validData = {
        name: 'Updated Card', description: 'Updated Desc', logo: 'new.png',
        date_release: '2028-01-01', date_revision: '2029-01-01', id: 'cc-01'
      };
      facade.form.setValue(validData);

      facade.form.get('date_revision')?.enable();
      facade.form.get('date_revision')?.setValue(validData.date_revision);

      spyOnProperty(facade.form, 'invalid', 'get').and.returnValue(false);

      productServiceSpy.updateProduct.and.returnValue(throwError(() => new Error('API Down')));

      await expectAsync(facade.update()).toBeRejectedWithError('API Down');
    });

    it('should NOT call updateProduct if form is invalid', async () => {
      facade.enableEditMode();
      facade.form.get('name')?.setValue('');

      const result = await facade.update();

      expect(productServiceSpy.updateProduct).not.toHaveBeenCalled();
      expect(result).toBeUndefined();
    });
  });

  it('should update revision date automatically when release date changes', () => {
    facade.enableEditMode();
    const releaseDateControl = facade.form.get('date_release');
    const revisionDateControl = facade.form.get('date_revision');

    releaseDateControl?.setValue('2030-05-20');

    expect(revisionDateControl?.value).toBe('2031-05-20');
  });

  it('should propagate error when updateProduct throws', async () => {
    facade.enableEditMode();
    const payload = {
      name: 'X', description: 'X description', logo: 'l.png',
      date_release: '2028-01-01', date_revision: '2029-01-01', id: 'cc-01'
    };
    facade.form.setValue(payload);
    facade.form.get('date_revision')?.enable();
    facade.form.get('date_revision')?.setValue(payload.date_revision);
    spyOnProperty(facade.form, 'invalid', 'get').and.returnValue(false);

    productServiceSpy.updateProduct.and.returnValue(throwError(() => new Error('API Down')));
    await expectAsync(facade.update()).toBeRejectedWithError('API Down');
  });

  it('cancelEditMode should disable date_revision control', () => {
    facade.enableEditMode();
    expect(facade.form.get('date_revision')?.disabled).toBeTrue();
    facade.cancelEditMode();
    expect(facade.form.get('date_revision')?.disabled).toBeTrue();
  });
});
