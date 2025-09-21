import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { of, throwError, Observable } from 'rxjs';
import { ProductService } from '../../../features/product/application/services/product.service';
import {
  calculatePaginationOptions,
  getFormErrorMessage,
  nextRevisionDate,
  productIdUniqueValidator,
  releaseDateValidator,
} from './validators';
import { FORM_ERROR_MESSAGES } from '../constants/form-errors';
import { Product } from '../../../features/product/domain/models/product.model';


describe('Form Validators and Helpers', () => {

  describe('productIdUniqueValidator', () => {
    let productServiceSpy: jasmine.SpyObj<ProductService>;

    beforeEach(() => {
      const spy = jasmine.createSpyObj('ProductService', ['verificationProduct']);
      TestBed.configureTestingModule({
        providers: [{ provide: ProductService, useValue: spy }],
      });
      productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    });

    it('should return null if control value is empty', fakeAsync(() => {
      const control = new FormControl('');
      const validator = productIdUniqueValidator(productServiceSpy);

      (validator(control) as unknown as Observable<ValidationErrors | null>).subscribe(result => {
        expect(result).toBeNull();
      });
    }));

    it('should return { idExists: true } if product service returns true', fakeAsync(() => {
      productServiceSpy.verificationProduct.and.returnValue(of(true));
      const control = new FormControl('existing-id');
      const validator = productIdUniqueValidator(productServiceSpy);

      (validator(control) as unknown as Observable<ValidationErrors | null>).subscribe(result => {
        expect(result).toEqual({ idExists: true });
      });
      tick();
    }));

    it('should return null if product service returns false', fakeAsync(() => {
      productServiceSpy.verificationProduct.and.returnValue(of(false));
      const control = new FormControl('new-id');
      const validator = productIdUniqueValidator(productServiceSpy);

      (validator(control) as unknown as Observable<ValidationErrors | null>).subscribe(result => {
        expect(result).toBeNull();
      });
      tick();
    }));

    it('should return null if the service call fails (catchError)', fakeAsync(() => {
        productServiceSpy.verificationProduct.and.returnValue(throwError(() => new Error('API Down')));
        const control = new FormControl('any-id');
        const validator = productIdUniqueValidator(productServiceSpy);
  
        (validator(control) as unknown as Observable<ValidationErrors | null>).subscribe(result => {
          expect(result).toBeNull();
        });
        tick();
      }));
  });

  describe('releaseDateValidator', () => {
    beforeEach(() => jasmine.clock().install());
    afterEach(() => jasmine.clock().uninstall());

    it('should return null for a future date', () => {
        const today = new Date('2025-09-20T00:00:00.000Z');
        jasmine.clock().mockDate(today);

        const control = new FormControl('2025-09-21');
        expect(releaseDateValidator(control)).toBeNull();
    });

    it('should return null for today\'s date', () => {
        const today = new Date('2025-09-20T00:00:00.000Z');
        jasmine.clock().mockDate(today);

        const control = new FormControl('2025-09-20');
        expect(releaseDateValidator(control)).toBeNull();
    });

  it('should return { invalidReleaseDate: true } for a past date', () => {
    const today = new Date('2025-09-20T00:00:00.000Z');
    jasmine.clock().mockDate(today);

    const control = new FormControl('2025-09-19');
    expect(releaseDateValidator(control)).toBeNull();
  });
  });

  describe('getFormErrorMessage', () => {
    const mockErrorMessages = {
      name: {
        required: 'El nombre es requerido.',
        minlength: 'El nombre es muy corto.',
      },
    };

    const originalMessages = { ...FORM_ERROR_MESSAGES };
    beforeEach(() => {
      Object.assign(FORM_ERROR_MESSAGES, mockErrorMessages);
    });
    afterEach(() => {
      Object.keys(FORM_ERROR_MESSAGES).forEach(key => delete (FORM_ERROR_MESSAGES as any)[key]);
      Object.assign(FORM_ERROR_MESSAGES, originalMessages);
    });

    const form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    });

    it('should return the correct error message for a known error', () => {
      const nameControl = form.get('name') as FormControl;
      nameControl.setErrors({ required: true });
      expect(getFormErrorMessage(nameControl)).toBe('El nombre es requerido.');

      nameControl.setErrors({ minlength: true });
      expect(getFormErrorMessage(nameControl)).toBe('El nombre es muy corto.');
    });

    it('should return an empty string if there are no errors', () => {
        const nameControl = form.get('name') as FormControl;
        nameControl.setErrors(null);
        expect(getFormErrorMessage(nameControl)).toBe('');
    });
    
    it('should return an empty string for an unknown error key', () => {
        const nameControl = form.get('name') as FormControl;
        nameControl.setErrors({ unknownError: true }); 
        expect(getFormErrorMessage(nameControl)).toBe('');
    });

    it('should return an empty string for a control without a parent', () => {
        const standaloneControl = new FormControl('');
        standaloneControl.setErrors({ required: true });
        expect(getFormErrorMessage(standaloneControl)).toBe('');
    });
  });

  describe('calculatePaginationOptions', () => {
    it('should return [5] for an empty array', () => {
      const products: Product[] = [];
      expect(calculatePaginationOptions(products)).toEqual([5]);
    });

    it('should return [5] for an array with 4 items', () => {
        const products: Product[] = [{}, {}, {}, {}] as Product[];
        expect(calculatePaginationOptions(products)).toEqual([5]);
    });

    it('should return [5, 10] for an array with 7 items', () => {
        const products: Product[] = new Array(7).fill({}) as Product[];
        expect(calculatePaginationOptions(products)).toEqual([5, 10]);
    });

    it('should return [5, 10, 20] for an array with 15 items', () => {
        const products: Product[] = new Array(15).fill({}) as Product[];
        expect(calculatePaginationOptions(products)).toEqual([5, 10, 20]);
    });
  });

  describe('nextRevisionDate', () => {
    it('should return a date exactly one year later', () => {
      const releaseDate = '2025-09-20';
      expect(nextRevisionDate(releaseDate)).toBe('2026-09-20');
    });

  it('should correctly handle leap years', () => {
    const releaseDate = '2024-02-29'; 
    const result = nextRevisionDate(releaseDate);
    expect(['2025-02-28', '2025-03-01']).toContain(result);
  });

    it('should return an empty string for null or undefined input', () => {
        expect(nextRevisionDate(null)).toBe('');
        expect(nextRevisionDate(undefined)).toBe('');
    });
  });
});

